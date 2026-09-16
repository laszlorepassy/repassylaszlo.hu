// Generator-based interpreter. Every block execution yields a small event
// object; the driver (main.js) pulls events with gen.next(), handling
// input requests, pacing 'Run' with a delay, and single-stepping 'Step'.
import { RuntimeError } from './errors.js';
import { parseExpr, evalExpr } from './expr.js';
import { findRoutine } from './model.js';

const MAX_STEPS = 500000;

export function defaultValueForType(type) {
  switch (type) {
    case 'Integer': case 'Real': return 0;
    case 'Boolean': return false;
    case 'String': default: return '';
  }
}

export function coerce(value, type) {
  switch (type) {
    case 'Integer': return Math.trunc(Number(value)) || 0;
    case 'Real': return Number(value) || 0;
    case 'Boolean': return typeof value === 'boolean' ? value : !!value && value !== '0' && value !== 'false';
    case 'String': default: return formatValue(value);
  }
}

export function formatValue(v) {
  if (Array.isArray(v)) return `[${v.map(formatValue).join(', ')}]`;
  if (typeof v === 'boolean') return v ? 'True' : 'False';
  if (v === undefined || v === null) return '';
  return String(v);
}

// Each declared variable is a {name, type, isArray, box} record, where
// `box` is a separate {value} container. By-reference parameters alias the
// *same box* into the callee's scope, so a mutation there (via set/array
// index write) is visible through every alias, including the caller's.
export class Scope {
  constructor() { this.vars = new Map(); }

  declare(name, type, blockId, arrayInfo = null) {
    const key = name.toLowerCase();
    if (this.vars.has(key)) throw new RuntimeError(`__ALREADY_DECLARED__:${name}`, blockId);
    const isArray = !!arrayInfo;
    const value = isArray
      ? Array.from({ length: Math.max(0, arrayInfo.size | 0) }, () => defaultValueForType(type))
      : defaultValueForType(type);
    this.vars.set(key, { name, type, isArray, box: { value } });
  }

  declareAlias(name, blockId, sourceRecord) {
    const key = name.toLowerCase();
    if (this.vars.has(key)) throw new RuntimeError(`__ALREADY_DECLARED__:${name}`, blockId);
    this.vars.set(key, { name, type: sourceRecord.type, isArray: sourceRecord.isArray, box: sourceRecord.box });
  }

  has(name) { return this.vars.has((name || '').toLowerCase()); }

  getRecord(name) {
    const r = this.vars.get(name.toLowerCase());
    if (!r) throw new RuntimeError(`__UNDECLARED__:${name}`);
    return r;
  }

  get(name) { return this.getRecord(name).box.value; }
  getType(name) { return this.getRecord(name).type; }
  isArrayVar(name) { return this.getRecord(name).isArray; }

  getArray(name) {
    const r = this.getRecord(name);
    if (!r.isArray) throw new RuntimeError(`__NOT_ARRAY__:${name}`);
    return r.box.value;
  }

  set(name, value, blockId) {
    const r = this.vars.get(name.toLowerCase());
    if (!r) throw new RuntimeError(`__UNDECLARED__:${name}`, blockId);
    if (r.isArray) throw new RuntimeError(`__ARRAY_NEEDS_INDEX__:${name}`, blockId);
    r.box.value = coerce(value, r.type);
  }

  setIndex(name, index, value, blockId) {
    const r = this.vars.get(name.toLowerCase());
    if (!r) throw new RuntimeError(`__UNDECLARED__:${name}`, blockId);
    if (!r.isArray) throw new RuntimeError(`__NOT_ARRAY__:${name}`, blockId);
    const arr = r.box.value;
    const i = Math.trunc(Number(index));
    if (i < 0 || i >= arr.length) throw new RuntimeError(`__INDEX_OUT_OF_RANGE__:${name}`, blockId);
    arr[i] = coerce(value, r.type);
  }

  entries() {
    return [...this.vars.values()].map((r) => ({ name: r.name, type: r.type, isArray: r.isArray, value: r.box.value }));
  }
}

const WRAPPABLE = ['__UNDECLARED__', '__ALREADY_DECLARED__', '__NOT_ARRAY__', '__ARRAY_NEEDS_INDEX__', '__INDEX_OUT_OF_RANGE__'];
function wrapUndeclared(err, blockId) {
  if (err instanceof RuntimeError) {
    for (const tag of WRAPPABLE) {
      if (err.message.startsWith(`${tag}:`)) {
        const name = err.message.slice(tag.length + 1);
        return new RuntimeError(`${tag.replace(/^__|__$/g, '')}:${name}`, blockId ?? err.blockId);
      }
    }
  }
  return err;
}

// Runs a routine body given an already-populated Scope. `io` = { output(text,newline) }.
function* execBody(list, scope, program, io, routine) {
  for (const block of list) {
    io.stepCount.n++;
    if (io.stepCount.n > MAX_STEPS) throw new RuntimeError('TOO_MANY_STEPS', block.id);
    yield { kind: 'step', blockId: block.id, scope, routine };
    yield* execBlock(block, scope, program, io, routine);
  }
}

function* evalNodeIn(node, scope, program, io, blockId) {
  try {
    const ctx = { scope, callFn: (name, argNodes, callerCtx) => callRoutineForValue(name, argNodes, callerCtx, program, io) };
    return yield* evalExpr(node, ctx);
  } catch (err) {
    throw wrapUndeclared(err, blockId);
  }
}

function* evalIn(exprSrc, scope, program, io, blockId) {
  let node;
  try { node = parseExpr(exprSrc); } catch (err) { throw wrapUndeclared(err, blockId); }
  return yield* evalNodeIn(node, scope, program, io, blockId);
}

// Resolves an assignment target string (a plain variable, or `arr[expr]`)
// and writes `value` into it.
function* assignTarget(targetSrc, value, scope, program, io, blockId) {
  let node;
  try { node = parseExpr(targetSrc); } catch (err) { throw wrapUndeclared(err, blockId); }
  if (node.kind === 'var') {
    try { scope.set(node.name, value, blockId); } catch (err) { throw wrapUndeclared(err, blockId); }
    return;
  }
  if (node.kind === 'index') {
    const idx = yield* evalNodeIn(node.index, scope, program, io, blockId);
    try { scope.setIndex(node.name, idx, value, blockId); } catch (err) { throw wrapUndeclared(err, blockId); }
    return;
  }
  throw new RuntimeError(`INVALID_ASSIGN_TARGET:${targetSrc}`, blockId);
}

function* execBlock(block, scope, program, io, routine) {
  switch (block.type) {
    case 'declare': {
      try {
        if (block.isArray) {
          const sizeVal = yield* evalIn(block.arraySize, scope, program, io, block.id);
          scope.declare(block.varName, block.varType, block.id, { size: Math.trunc(Number(sizeVal)) });
        } else {
          scope.declare(block.varName, block.varType, block.id);
        }
      } catch (err) { throw wrapUndeclared(err, block.id); }
      return;
    }
    case 'assign': {
      const v = yield* evalIn(block.expr, scope, program, io, block.id);
      yield* assignTarget(block.varName, v, scope, program, io, block.id);
      return;
    }
    case 'input': {
      let node;
      try { node = parseExpr(block.varName); } catch (err) { throw wrapUndeclared(err, block.id); }
      const baseName = node.name;
      if (!scope.has(baseName)) throw new RuntimeError(`UNDECLARED:${baseName}`, block.id);
      const varType = scope.getType(baseName);
      const raw = yield { kind: 'input', blockId: block.id, varName: block.varName, prompt: block.prompt, varType, scope, routine };
      yield* assignTarget(block.varName, raw, scope, program, io, block.id);
      return;
    }
    case 'output': {
      const v = yield* evalIn(block.expr, scope, program, io, block.id);
      io.output(formatValue(v), !!block.newline);
      return;
    }
    case 'if': {
      const cond = yield* evalIn(block.cond, scope, program, io, block.id);
      yield* execBody(cond ? block.trueBody : block.falseBody, scope, program, io, routine);
      return;
    }
    case 'while': {
      while (yield* evalIn(block.cond, scope, program, io, block.id)) {
        yield* execBody(block.body, scope, program, io, routine);
        io.stepCount.n++;
        if (io.stepCount.n > MAX_STEPS) throw new RuntimeError('TOO_MANY_STEPS', block.id);
      }
      return;
    }
    case 'dowhile': {
      do {
        yield* execBody(block.body, scope, program, io, routine);
        io.stepCount.n++;
        if (io.stepCount.n > MAX_STEPS) throw new RuntimeError('TOO_MANY_STEPS', block.id);
      } while (yield* evalIn(block.cond, scope, program, io, block.id));
      return;
    }
    case 'for': {
      const start = Number(yield* evalIn(block.start, scope, program, io, block.id));
      const end = Number(yield* evalIn(block.end, scope, program, io, block.id));
      const step = Number(yield* evalIn(block.step, scope, program, io, block.id)) || 1;
      if (!scope.has(block.varName)) scope.declare(block.varName, 'Integer', block.id);
      let i = start;
      scope.set(block.varName, i, block.id);
      while (step > 0 ? i <= end : i >= end) {
        yield* execBody(block.body, scope, program, io, routine);
        io.stepCount.n++;
        if (io.stepCount.n > MAX_STEPS) throw new RuntimeError('TOO_MANY_STEPS', block.id);
        i += step;
        scope.set(block.varName, i, block.id);
      }
      return;
    }
    case 'call': {
      const target = findRoutine(program, block.routine);
      if (!target) throw new RuntimeError(`UNKNOWN_ROUTINE:${block.routine}`, block.id);
      let argNodes;
      try { argNodes = block.args.map((a) => parseExpr(a)); } catch (err) { throw wrapUndeclared(err, block.id); }
      const prepared = yield* prepareArgs(target, argNodes, scope, program, io, block.id);
      const calleeScope = bindParams(target, prepared, block.id);
      yield* execBody(target.body, calleeScope, program, io, target);
      return;
    }
    case 'comment': return;
    default: throw new RuntimeError(`Unknown block type: ${block.type}`);
  }
}

// Evaluates (or, for by-ref params, resolves) each call argument against
// the *caller's* scope, before any callee scope exists. An array argument
// is always aliased regardless of the parameter's by-ref flag: this
// matches real Flowgorithm, where arrays are implicitly reference-like
// when passed as parameters (see its documentation: "args by reference?
// NO, except for arrays") — by-ref for *scalars* is this app's own
// deliberate addition on top of that.
function* prepareArgs(routine, argNodes, callerScope, program, io, blockId) {
  const prepared = [];
  for (let idx = 0; idx < routine.params.length; idx++) {
    const p = routine.params[idx];
    const node = argNodes[idx];
    const isPlainVar = node && node.kind === 'var';
    const isArrayArg = isPlainVar && callerScope.has(node.name) && callerScope.isArrayVar(node.name);
    if (p.byRef || isArrayArg) {
      if (!isPlainVar) throw new RuntimeError(`BYREF_NEEDS_VARIABLE:${p.name}`, blockId);
      if (!callerScope.has(node.name)) throw new RuntimeError(`UNDECLARED:${node.name}`, blockId);
      prepared.push({ byRef: true, record: callerScope.getRecord(node.name) });
    } else {
      const v = node ? yield* evalNodeIn(node, callerScope, program, io, blockId) : undefined;
      prepared.push({ byRef: false, value: v });
    }
  }
  return prepared;
}

function bindParams(routine, prepared, blockId) {
  const scope = new Scope();
  routine.params.forEach((p, idx) => {
    const arg = prepared[idx];
    if (arg && arg.byRef) {
      scope.declareAlias(p.name, blockId, arg.record);
    } else {
      scope.declare(p.name, p.type, blockId);
      if (arg) scope.set(p.name, arg.value, blockId);
    }
  });
  // Auto-declare the return variable, matching this app's own convention
  // of an implicit return variable — *unless* the body already declares it
  // itself, which is how a real Flowgorithm file always does it (there the
  // return variable is an ordinary local variable, just one whose name was
  // chosen when the function was created).
  if (routine.kind === 'function' && !bodyTopLevelDeclares(routine.body, returnVarName(routine))) {
    scope.declare(returnVarName(routine), routine.returnType, blockId);
  }
  return scope;
}

function bodyTopLevelDeclares(body, name) {
  const key = name.toLowerCase();
  return body.some((b) => b.type === 'declare' && b.varName.toLowerCase() === key);
}

// The variable whose final value becomes a function's return value. This
// app's own routines use the function's own name (BASIC/Pascal style), but
// an imported real Flowgorithm file may name it independently (e.g.
// function "Circle" returning variable "Area") via routine.returnVar.
function returnVarName(routine) { return routine.returnVar || routine.name; }

// callFn contract used by expr.js: called with the *unevaluated* argument
// AST nodes plus the caller's ctx (so by-ref params can resolve a variable
// name without first evaluating it as a value).
function* callRoutineForValue(name, argNodes, callerCtx, program, io) {
  const routine = findRoutine(program, name);
  if (!routine) throw new RuntimeError(`UNKNOWN_ROUTINE:${name}`);
  const prepared = yield* prepareArgs(routine, argNodes, callerCtx.scope, program, io, null);
  const scope = bindParams(routine, prepared, null);
  yield* execBody(routine.body, scope, program, io, routine);
  return routine.kind === 'function' ? scope.get(returnVarName(routine)) : undefined;
}

// Top-level entry point: runs Main. `io` = { output(text,newline) }.
export function* runProgram(program, io) {
  io.stepCount = { n: 0 };
  const main = program.routines.find((r) => r.kind === 'main') || program.routines[0];
  const scope = new Scope();
  yield* execBody(main.body, scope, program, io, main);
  return scope;
}
