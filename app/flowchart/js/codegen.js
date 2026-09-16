// Python 3 source code generator. Flowchart nesting maps naturally onto
// Python indentation.
//
// By-reference parameters: Python has no true pass-by-reference for scalar
// values, so a Call *statement* to a procedure with by-ref parameters is
// desugared into `arg1, arg2 = Routine(arg1, arg2)`, with the routine's
// `def` returning its by-ref parameters' final values. This only applies
// to Call statements (not to a function call used inline inside a larger
// expression), which is the common case.
import { exprToPython } from './expr.js';

const TYPE_HINT = { Integer: 'int', Real: 'float', String: 'str', Boolean: 'bool' };
const DEFAULT_LITERAL = { Integer: '0', Real: '0.0', String: '""', Boolean: 'False' };

function ind(depth) { return '    '.repeat(depth); }

function findRoutineByName(program, name) {
  return program.routines.find((r) => r.name.toLowerCase() === (name || '').toLowerCase());
}

function walkAllBodies(program, visit) {
  const check = (list) => list.some((b) => {
    if (visit(b)) return true;
    if (b.type === 'if') return check(b.trueBody) || check(b.falseBody);
    if (b.type === 'while' || b.type === 'dowhile' || b.type === 'for') return check(b.body);
    return false;
  });
  return program.routines.some((r) => check(r.body));
}

function usesRandom(program) {
  const re = /\brandom\s*\(/i;
  return walkAllBodies(program, (b) => {
    if ((b.type === 'assign' || b.type === 'output') && re.test(b.expr)) return true;
    if ((b.type === 'if' || b.type === 'while' || b.type === 'dowhile') && re.test(b.cond)) return true;
    return false;
  });
}
function usesMath(program) {
  const re = /\b(sqrt|floor|ceil|ceiling|trunc|sin|cos|tan|asin|acos|atan|log|log10)\s*\(|\bpi\b/i;
  return walkAllBodies(program, (b) => {
    if ((b.type === 'assign' || b.type === 'output') && re.test(b.expr)) return true;
    if ((b.type === 'if' || b.type === 'while' || b.type === 'dowhile') && re.test(b.cond)) return true;
    return false;
  });
}

function genBlock(b, depth) {
  const i = ind(depth);
  switch (b.type) {
    case 'declare':
      if (b.isArray) {
        return `${i}${b.varName} = [${DEFAULT_LITERAL[b.varType] ?? '0'}] * (${exprToPython(b.arraySize)})  # list[${TYPE_HINT[b.varType] ?? ''}]\n`;
      }
      return `${i}${b.varName} = ${DEFAULT_LITERAL[b.varType] ?? '0'}  # ${TYPE_HINT[b.varType] ?? ''}\n`;
    case 'assign':
      return `${i}${b.varName} = ${exprToPython(b.expr)}\n`;
    case 'output':
      return `${i}print(${exprToPython(b.expr)}${b.newline ? '' : ', end=""'})\n`;
    case 'comment':
      return `${i}# ${String(b.text || '').replace(/\n/g, `\n${i}# `)}\n`;
    default:
      return `${i}pass\n`;
  }
}

function genCallStatement(b, depth, program) {
  const i = ind(depth);
  const args = b.args.map(exprToPython);
  const routine = findRoutineByName(program, b.routine);
  const call = `${b.routine}(${args.join(', ')})`;
  if (routine && routine.kind !== 'function') {
    const byRefTargets = routine.params.map((p, idx) => (p.byRef ? args[idx] : null)).filter(Boolean);
    if (byRefTargets.length > 0) return `${i}${byRefTargets.join(', ')} = ${call}\n`;
  }
  return `${i}${call}\n`;
}

function genInputWithType(b, varType) {
  const raw = `input(${JSON.stringify(b.prompt ? `${b.prompt} ` : '')})`;
  if (varType === 'Integer') return `int(${raw})`;
  if (varType === 'Real') return `float(${raw})`;
  if (varType === 'Boolean') return `(${raw}).strip().lower() in ("true", "1", "yes")`;
  return raw;
}

function collectDeclaredTypes(list, map) {
  for (const b of list) {
    if (b.type === 'declare') map[b.varName.toLowerCase()] = b.varType;
    else if (b.type === 'for') map[b.varName.toLowerCase()] = 'Integer';
    if (b.type === 'if') { collectDeclaredTypes(b.trueBody, map); collectDeclaredTypes(b.falseBody, map); }
    else if (b.body) collectDeclaredTypes(b.body, map);
  }
}

export function generatePython(program) {
  let out = '';
  const needsRandom = usesRandom(program);
  const needsMath = usesMath(program);
  if (needsMath) out += 'import math\n';
  if (needsRandom) out += 'import random\n';
  out += '\n';

  for (const r of program.routines) {
    if (r.kind === 'main') continue;
    const params = r.params.map((p) => p.name).join(', ');
    out += `def ${r.name}(${params}):\n`;
    const typeMap = {};
    collectDeclaredTypes(r.body, typeMap);
    out += genBodyWithInputTypes(r.body, 1, typeMap, program);
    const byRefNames = r.params.filter((p) => p.byRef).map((p) => p.name);
    if (r.kind === 'function') out += `${ind(1)}return ${r.returnVar || r.name}\n`;
    else if (byRefNames.length > 0) out += `${ind(1)}return ${byRefNames.join(', ')}\n`;
    out += '\n';
  }

  const main = program.routines.find((r) => r.kind === 'main');
  out += 'def main():\n';
  const typeMap = {};
  collectDeclaredTypes(main.body, typeMap);
  out += genBodyWithInputTypes(main.body, 1, typeMap, program);
  out += '\n\nif __name__ == "__main__":\n    main()\n';
  return out;
}

// Re-walks bodies to render Input with proper type conversion (needs the
// declared-type map gathered up-front since Declare may appear anywhere)
// and Call statements with by-reference return desugaring.
function genBodyWithInputTypes(list, depth, typeMap, program) {
  if (list.length === 0) return `${ind(depth)}pass\n`;
  let out = '';
  for (const b of list) {
    if (b.type === 'input') {
      const baseName = b.varName.replace(/\[.*\]/, '').toLowerCase();
      out += `${ind(depth)}${b.varName} = ${genInputWithType(b, typeMap[baseName] || 'String')}\n`;
    } else if (b.type === 'call') {
      out += genCallStatement(b, depth, program);
    } else if (b.type === 'if') {
      let s = `${ind(depth)}if ${exprToPython(b.cond)}:\n${genBodyWithInputTypes(b.trueBody, depth + 1, typeMap, program)}`;
      if (b.falseBody.length) s += `${ind(depth)}else:\n${genBodyWithInputTypes(b.falseBody, depth + 1, typeMap, program)}`;
      out += s;
    } else if (b.type === 'while') {
      out += `${ind(depth)}while ${exprToPython(b.cond)}:\n${genBodyWithInputTypes(b.body, depth + 1, typeMap, program)}`;
    } else if (b.type === 'dowhile') {
      out += `${ind(depth)}while True:\n${genBodyWithInputTypes(b.body, depth + 1, typeMap, program)}${ind(depth + 1)}if not (${exprToPython(b.cond)}):\n${ind(depth + 2)}break\n`;
    } else if (b.type === 'for') {
      const s = exprToPython(b.start);
      const e = exprToPython(b.end);
      const st = exprToPython(b.step);
      out += `${ind(depth)}${b.varName} = ${s}\n${ind(depth)}while ${b.varName} <= (${e}) if (${st}) > 0 else ${b.varName} >= (${e}):\n${genBodyWithInputTypes(b.body, depth + 1, typeMap, program)}${ind(depth + 1)}${b.varName} += ${st}\n`;
    } else {
      out += genBlock(b, depth);
    }
  }
  return out;
}
