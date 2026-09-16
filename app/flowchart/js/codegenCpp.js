// C++17 source code generator. Self-contained (its own expression printer
// over the shared AST from expr.js) so it can't regress the Python
// generator. By-reference parameters map onto real C++ reference
// parameters, so — unlike the Python generator — no by-ref desugaring is
// needed at call sites.
import { parseExpr } from './expr.js';

const CPP_TYPE = { Integer: 'int', Real: 'double', String: 'std::string', Boolean: 'bool' };
const CPP_DEFAULT = { Integer: '0', Real: '0.0', String: '""', Boolean: 'false' };

function ind(depth) { return '    '.repeat(depth); }

function findRoutineByName(program, name) {
  return program.routines.find((r) => r.name.toLowerCase() === (name || '').toLowerCase());
}

function collectDeclaredTypes(list, map) {
  for (const b of list) {
    if (b.type === 'declare') map[b.varName.toLowerCase()] = { type: b.varType, isArray: !!b.isArray };
    else if (b.type === 'for') map[b.varName.toLowerCase()] = { type: 'Integer', isArray: false };
    if (b.type === 'if') { collectDeclaredTypes(b.trueBody, map); collectDeclaredTypes(b.falseBody, map); }
    else if (b.body) collectDeclaredTypes(b.body, map);
  }
}

function typeMapForRoutine(routine, arrayParamIdx) {
  const map = {};
  const arraySet = (arrayParamIdx && arrayParamIdx.get(routine.name.toLowerCase())) || new Set();
  routine.params.forEach((p, idx) => { map[p.name.toLowerCase()] = { type: p.type, isArray: arraySet.has(idx) }; });
  collectDeclaredTypes(routine.body, map);
  if (routine.kind === 'function') {
    const retName = (routine.returnVar || routine.name).toLowerCase();
    if (!map[retName]) map[retName] = { type: routine.returnType, isArray: false };
  }
  return map;
}

// Cheap heuristic: a parameter is treated as an array if it's ever indexed
// (`name[`) anywhere in the routine's raw expr/cond/varName text.
function paramLooksLikeArray(routine, paramName) {
  const re = new RegExp(`\\b${paramName}\\s*\\[`, 'i');
  return collectRawTexts(routine.body).some((s) => re.test(s));
}

function collectRawTexts(list) {
  const texts = [];
  const walk = (l) => {
    for (const b of l) {
      if (b.varName) texts.push(b.varName);
      if (b.expr) texts.push(b.expr);
      if (b.cond) texts.push(b.cond);
      if (b.start) texts.push(b.start);
      if (b.end) texts.push(b.end);
      if (b.step) texts.push(b.step);
      if (b.args) texts.push(...b.args);
      if (b.type === 'if') { walk(b.trueBody); walk(b.falseBody); }
      else if (b.body) walk(b.body);
    }
  };
  walk(list);
  return texts;
}

function findCallNodesInAst(node, out) {
  if (!node || typeof node !== 'object') return;
  if (node.kind === 'call') out.push({ name: node.name, args: node.args });
  for (const key of ['left', 'right', 'expr', 'index']) {
    if (node[key]) findCallNodesInAst(node[key], out);
  }
  if (node.args) for (const a of node.args) findCallNodesInAst(a, out);
}

// Collects every routine call — both explicit `call` blocks *and* function
// calls embedded inside a larger expression (e.g. `winner = checkForWinner
// (board, player)`, an `assign` block whose expr happens to be a call) —
// as {name, args: AST[]} pairs, since Flowgorithm functions are invoked
// like any other expression, not just via a dedicated Call symbol.
function collectCallSites(list, out) {
  for (const b of list) {
    if (b.type === 'call') {
      out.push({ name: b.routine, args: b.args.map((a) => { try { return parseExpr(a); } catch { return null; } }) });
    }
    for (const text of [b.expr, b.cond, b.start, b.end, b.step]) {
      if (!text) continue;
      let ast;
      try { ast = parseExpr(text); } catch { continue; }
      findCallNodesInAst(ast, out);
    }
    if (b.type === 'if') { collectCallSites(b.trueBody, out); collectCallSites(b.falseBody, out); }
    else if (b.body) collectCallSites(b.body, out);
  }
}

// Real Flowgorithm arrays are always alias-passed (see interpreter.js's
// prepareArgs), so a parameter that another routine passes straight through
// to an array-typed parameter elsewhere must *also* be treated as an array,
// even without ever being indexed locally (e.g. a tic-tac-toe `board`
// forwarded untouched through several helper functions before it's finally
// indexed). This does a small fixed-point propagation over the whole call
// graph, seeded by locally-indexed params and locally declared arrays.
function analyzeArrayParams(program) {
  const arrayParamIdx = new Map();
  for (const r of program.routines) arrayParamIdx.set(r.name.toLowerCase(), new Set());

  for (const r of program.routines) {
    const set = arrayParamIdx.get(r.name.toLowerCase());
    r.params.forEach((p, idx) => { if (paramLooksLikeArray(r, p.name)) set.add(idx); });
  }

  function localArrayNames(r) {
    const names = new Set();
    const typeMap = {};
    collectDeclaredTypes(r.body, typeMap);
    for (const k of Object.keys(typeMap)) if (typeMap[k].isArray) names.add(k);
    const set = arrayParamIdx.get(r.name.toLowerCase());
    r.params.forEach((p, idx) => { if (set.has(idx)) names.add(p.name.toLowerCase()); });
    return names;
  }

  let changed = true;
  let guard = 0;
  while (changed && guard < 20) {
    changed = false;
    guard += 1;
    for (const r of program.routines) {
      const names = localArrayNames(r);
      const calls = [];
      collectCallSites(r.body, calls);
      for (const call of calls) {
        const target = findRoutineByName(program, call.name);
        if (!target) continue;
        const targetSet = arrayParamIdx.get(target.name.toLowerCase());
        call.args.forEach((node, idx) => {
          if (idx >= target.params.length) return;
          if (!node || node.kind !== 'var') return;
          const argNameLower = node.name.toLowerCase();
          // Forward: the caller passes a known-array variable/param -> the
          // callee's matching parameter must be an array too.
          if (names.has(argNameLower) && !targetSet.has(idx)) {
            targetSet.add(idx);
            changed = true;
          }
          // Backward: the callee's matching parameter is already known to
          // be an array, and the argument is one of THIS routine's own
          // parameters (just forwarded through, never indexed here) -> that
          // parameter must be an array too (e.g. a `board` passed untouched
          // through several helper functions before it's finally indexed).
          if (targetSet.has(idx)) {
            const callerParamIdx = r.params.findIndex((p) => p.name.toLowerCase() === argNameLower);
            if (callerParamIdx >= 0) {
              const callerSet = arrayParamIdx.get(r.name.toLowerCase());
              if (!callerSet.has(callerParamIdx)) {
                callerSet.add(callerParamIdx);
                changed = true;
              }
            }
          }
        });
      }
    }
  }
  return arrayParamIdx;
}

function looksStringy(node, typeMap) {
  if (!node) return false;
  if (node.kind === 'str') return true;
  if (node.kind === 'var') { const e = typeMap[node.name.toLowerCase()]; return !!e && e.type === 'String'; }
  if (node.kind === 'index') { const e = typeMap[node.name.toLowerCase()]; return !!e && e.type === 'String'; }
  if (node.kind === 'bin' && (node.op === '+' || node.op === '&')) return looksStringy(node.left, typeMap) || looksStringy(node.right, typeMap);
  return false;
}

function cppStrLit(s) {
  return `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
}

const PI_LITERAL = '3.14159265358979323846';

function nodeToCpp(node, typeMap) {
  switch (node.kind) {
    case 'num': return String(node.value);
    case 'str': return cppStrLit(node.value);
    case 'bool': return node.value ? 'true' : 'false';
    case 'var': return node.name.toLowerCase() === 'pi' && !typeMap[node.name.toLowerCase()] ? PI_LITERAL : node.name;
    case 'index': return `${node.name}[(int)(${nodeToCpp(node.index, typeMap)})]`;
    case 'unary': return `(${node.op}${nodeToCpp(node.expr, typeMap)})`;
    case 'not': return `(!${nodeToCpp(node.expr, typeMap)})`;
    case 'logical': return `(${nodeToCpp(node.left, typeMap)} ${node.op === 'and' ? '&&' : '||'} ${nodeToCpp(node.right, typeMap)})`;
    case 'compare': {
      const opMap = { '=': '==', '<>': '!=', '<': '<', '>': '>', '<=': '<=', '>=': '>=' };
      return `(${nodeToCpp(node.left, typeMap)} ${opMap[node.op]} ${nodeToCpp(node.right, typeMap)})`;
    }
    case 'bin': {
      if (node.op === '&' || (node.op === '+' && looksStringy(node, typeMap))) {
        return `(_fstr(${nodeToCpp(node.left, typeMap)}) + _fstr(${nodeToCpp(node.right, typeMap)}))`;
      }
      if (node.op === 'mod') return `((int)(${nodeToCpp(node.left, typeMap)}) % (int)(${nodeToCpp(node.right, typeMap)}))`;
      if (node.op === 'div') return `((int)(${nodeToCpp(node.left, typeMap)}) / (int)(${nodeToCpp(node.right, typeMap)}))`;
      if (node.op === '^') return `pow(${nodeToCpp(node.left, typeMap)}, ${nodeToCpp(node.right, typeMap)})`;
      return `(${nodeToCpp(node.left, typeMap)} ${node.op} ${nodeToCpp(node.right, typeMap)})`;
    }
    case 'call': {
      const lower = node.name.toLowerCase();
      const args = node.args.map((a) => nodeToCpp(a, typeMap));
      switch (lower) {
        case 'abs': return `abs(${args[0]})`;
        case 'sqrt': return `sqrt(${args[0]})`;
        case 'round': return `round(${args[0]})`;
        case 'floor': return `floor(${args[0]})`;
        case 'ceil': case 'ceiling': return `ceil(${args[0]})`;
        case 'trunc': return `trunc(${args[0]})`;
        case 'int': return `((int)(${args[0]}))`;
        case 'pow': return `pow(${args[0]}, ${args[1]})`;
        case 'random':
          if (args.length >= 2) return `(rand() % (int)((${args[1]}) - (${args[0]}) + 1) + (int)(${args[0]}))`;
          if (args.length === 1) return `(rand() % (int)(${args[0]}))`;
          return `((double)rand() / RAND_MAX)`;
        case 'length': case 'size': case 'len': return `((int)(${args[0]}).size())`;
        case 'left': return `(${args[0]}).substr(0, (int)(${args[1]}))`;
        case 'right': return `_right(${args[0]}, (int)(${args[1]}))`;
        case 'mid': return `(${args[0]}).substr((int)(${args[1]}), (int)(${args[2]}))`;
        case 'upper': return `_upper(${args[0]})`;
        case 'lower': return `_lower(${args[0]})`;
        case 'trim': return `_trim(${args[0]})`;
        case 'tostring': case 'str': return `_fstr(${args[0]})`;
        case 'tonumber': case 'float': return `stod(${args[0]})`;
        case 'min': return args.length >= 2 ? `std::min(${args[0]}, ${args[1]})` : args[0];
        case 'max': return args.length >= 2 ? `std::max(${args[0]}, ${args[1]})` : args[0];
        case 'sign': return `(((${args[0]}) > 0) - ((${args[0]}) < 0))`;
        case 'sin': return `sin(${args[0]})`;
        case 'cos': return `cos(${args[0]})`;
        case 'tan': return `tan(${args[0]})`;
        case 'asin': return `asin(${args[0]})`;
        case 'acos': return `acos(${args[0]})`;
        case 'atan': return `atan(${args[0]})`;
        case 'log': return `log(${args[0]})`;
        case 'log10': return `log10(${args[0]})`;
        case 'char': case 'tochar':
          return args.length >= 2
            ? `std::string(1, (${args[0]})[(int)(${args[1]}) - 1])`
            : `std::string(1, (char)(${args[0]}))`;
        case 'ascii': case 'tocode': return `((int)(unsigned char)(${args[0]})[0])`;
        case 'concat': return `(${args.map((a) => `_fstr(${a})`).join(' + ')})`;
        default: return `${node.name}(${args.join(', ')})`;
      }
    }
    default: return '';
  }
}

function exprToCpp(src, typeMap) {
  return nodeToCpp(parseExpr(src), typeMap);
}

// Splits a top-level `+`/`&` chain into separate `cout <<` operands
// instead of concatenating into one string, so each piece keeps its own
// native type and prints via cout's normal overloads (no to_string calls
// needed for the common "print some text and a value" case).
function flattenOutputChain(node, typeMap) {
  if (node.kind === 'bin' && (node.op === '+' || node.op === '&')) {
    return [...flattenOutputChain(node.left, typeMap), ...flattenOutputChain(node.right, typeMap)];
  }
  return [nodeToCpp(node, typeMap)];
}

function genBlock(b, depth, typeMap) {
  const i = ind(depth);
  switch (b.type) {
    case 'declare': {
      const cppType = CPP_TYPE[b.varType] || 'int';
      if (b.isArray) {
        return `${i}std::vector<${cppType}> ${b.varName}((int)(${exprToCpp(b.arraySize, typeMap)}), ${CPP_DEFAULT[b.varType] ?? '0'});\n`;
      }
      return `${i}${cppType} ${b.varName} = ${CPP_DEFAULT[b.varType] ?? '0'};\n`;
    }
    case 'assign':
      return `${i}${b.varName} = ${exprToCpp(b.expr, typeMap)};\n`;
    case 'output': {
      const parts = flattenOutputChain(parseExpr(b.expr), typeMap);
      return `${i}std::cout << ${parts.join(' << ')}${b.newline ? ' << std::endl' : ''};\n`;
    }
    case 'comment':
      return `${i}// ${String(b.text || '').replace(/\n/g, `\n${i}// `)}\n`;
    default:
      return `${i};\n`;
  }
}

function genInputStatement(b, depth, typeMap) {
  const i = ind(depth);
  let out = '';
  if (b.prompt) out += `${i}std::cout << ${cppStrLit(`${b.prompt} `)};\n`;
  out += `${i}std::cin >> ${b.varName};\n`;
  return out;
}

function genCallStatement(b, depth, typeMap) {
  const args = b.args.map((a) => exprToCpp(a, typeMap));
  return `${ind(depth)}${b.routine}(${args.join(', ')});\n`;
}

function genBody(list, depth, typeMap, program) {
  if (list.length === 0) return '';
  let out = '';
  for (const b of list) {
    if (b.type === 'input') {
      out += genInputStatement(b, depth, typeMap);
    } else if (b.type === 'call') {
      out += genCallStatement(b, depth, typeMap);
    } else if (b.type === 'if') {
      let s = `${ind(depth)}if (${exprToCpp(b.cond, typeMap)}) {\n${genBody(b.trueBody, depth + 1, typeMap, program)}${ind(depth)}}\n`;
      if (b.falseBody.length) s += `${ind(depth)}else {\n${genBody(b.falseBody, depth + 1, typeMap, program)}${ind(depth)}}\n`;
      out += s;
    } else if (b.type === 'while') {
      out += `${ind(depth)}while (${exprToCpp(b.cond, typeMap)}) {\n${genBody(b.body, depth + 1, typeMap, program)}${ind(depth)}}\n`;
    } else if (b.type === 'dowhile') {
      out += `${ind(depth)}do {\n${genBody(b.body, depth + 1, typeMap, program)}${ind(depth)}} while (${exprToCpp(b.cond, typeMap)});\n`;
    } else if (b.type === 'for') {
      const s = exprToCpp(b.start, typeMap);
      const e = exprToCpp(b.end, typeMap);
      const st = exprToCpp(b.step, typeMap);
      out += `${ind(depth)}for (${b.varName} = ${s}; (${st}) > 0 ? ${b.varName} <= (${e}) : ${b.varName} >= (${e}); ${b.varName} += (${st})) {\n${genBody(b.body, depth + 1, typeMap, program)}${ind(depth)}}\n`;
    } else {
      out += genBlock(b, depth, typeMap);
    }
  }
  return out;
}

function paramListCpp(routine, arrayParamIdx) {
  const set = (arrayParamIdx && arrayParamIdx.get(routine.name.toLowerCase())) || new Set();
  return routine.params.map((p, idx) => {
    const cppType = CPP_TYPE[p.type] || 'int';
    // Arrays are always alias-passed at runtime (matching real Flowgorithm),
    // regardless of the parameter's own by-ref flag — see interpreter.js's
    // prepareArgs. So an array-looking parameter always becomes a
    // reference, and only a scalar's by-ref flag is optional.
    if (set.has(idx)) return `std::vector<${cppType}>& ${p.name}`;
    if (p.byRef) return `${cppType}& ${p.name}`;
    return `${cppType} ${p.name}`;
  }).join(', ');
}

function forwardDeclaration(routine, arrayParamIdx) {
  const retType = routine.kind === 'function' ? (CPP_TYPE[routine.returnType] || 'int') : 'void';
  return `${retType} ${routine.name}(${paramListCpp(routine, arrayParamIdx)});\n`;
}

const PREAMBLE = `#include <iostream>
#include <string>
#include <vector>
#include <cmath>
#include <algorithm>
#include <cstdlib>
#include <ctime>
#include <sstream>
using namespace std;

// --- helpers used by the generated program (string conversion, case
// folding, trimming, right()); kept small and self-contained so this file
// compiles standalone with just the standard library. ---
template<typename T> std::string _fstr(const T& v) { std::ostringstream oss; oss << v; return oss.str(); }
inline std::string _fstr(bool v) { return v ? "true" : "false"; }
std::string _upper(std::string s) { for (auto& c : s) c = (char)toupper((unsigned char)c); return s; }
std::string _lower(std::string s) { for (auto& c : s) c = (char)tolower((unsigned char)c); return s; }
std::string _trim(std::string s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n");
    if (a == std::string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n");
    return s.substr(a, b - a + 1);
}
std::string _right(const std::string& s, int n) {
    if (n >= (int)s.size()) return s;
    return s.substr(s.size() - n);
}
`;

export function generateCpp(program) {
  let out = PREAMBLE;

  const arrayParamIdx = analyzeArrayParams(program);
  const routines = program.routines.filter((r) => r.kind !== 'main');
  if (routines.length > 0) {
    out += '\n';
    for (const r of routines) out += forwardDeclaration(r, arrayParamIdx);
  }

  out += '\n';
  for (const r of routines) {
    const retType = r.kind === 'function' ? (CPP_TYPE[r.returnType] || 'int') : 'void';
    const typeMap = typeMapForRoutine(r, arrayParamIdx);
    out += `${retType} ${r.name}(${paramListCpp(r, arrayParamIdx)}) {\n`;
    out += genBody(r.body, 1, typeMap, program);
    if (r.kind === 'function') out += `${ind(1)}return ${r.returnVar || r.name};\n`;
    out += '}\n\n';
  }

  const main = program.routines.find((r) => r.kind === 'main');
  const typeMap = typeMapForRoutine(main, arrayParamIdx);
  out += 'int main() {\n';
  out += `${ind(1)}srand((unsigned)time(0));\n`;
  out += genBody(main.body, 1, typeMap, program);
  out += `${ind(1)}return 0;\n`;
  out += '}\n';
  return out;
}
