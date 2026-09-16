// Data model for flowcharts: programs, routines and blocks.
// A Program has one or more Routines (the first is always "Main").
// A Routine has a body: an array of Blocks. Container blocks (if/while/
// dowhile/for) hold nested body arrays directly, so the arrays themselves
// are the stable references the editor/renderer splice into.

let idCounter = 1;
export function newId(prefix = 'b') {
  return `${prefix}${idCounter++}_${Math.random().toString(36).slice(2, 7)}`;
}

export const BLOCK_TYPES = [
  'declare', 'assign', 'input', 'output',
  'if', 'while', 'dowhile', 'for', 'call', 'comment',
];

export const VAR_TYPES = ['Integer', 'Real', 'String', 'Boolean'];

const BLOCK_DEFAULTS = {
  declare: () => ({ varName: 'x', varType: 'Integer', isArray: false, arraySize: '10' }),
  assign: () => ({ varName: 'x', expr: '0' }),
  input: () => ({ varName: 'x', prompt: '' }),
  output: () => ({ expr: '""', newline: true }),
  if: () => ({ cond: 'True', trueBody: [], falseBody: [] }),
  while: () => ({ cond: 'True', body: [] }),
  dowhile: () => ({ cond: 'True', body: [] }),
  for: () => ({ varName: 'i', start: '1', end: '10', step: '1', body: [] }),
  call: () => ({ routine: '', args: [] }),
  comment: () => ({ text: '' }),
};

export function newBlock(type, overrides = {}) {
  if (!BLOCK_DEFAULTS[type]) throw new Error(`Unknown block type: ${type}`);
  return Object.assign({ id: newId(), type }, BLOCK_DEFAULTS[type](), overrides);
}

export function cloneBlock(block) {
  return JSON.parse(JSON.stringify(block));
}

export function newRoutine(name, kind = 'procedure') {
  return {
    id: newId('r'),
    name,
    kind, // 'main' | 'procedure' | 'function'
    params: [], // [{name, type, byRef}]
    returnType: kind === 'function' ? 'Integer' : null,
    returnVar: null, // if set, the function's return value comes from this variable instead of one named after the routine
    body: [],
  };
}

export function newProgram() {
  return { routines: [newRoutine('Main', 'main')] };
}

// Recursively collect every block-list array within a routine (used for
// validation / lookups that need to touch every nested body).
export function getBodyLists(routine) {
  const lists = [];
  (function walk(list) {
    lists.push(list);
    for (const b of list) {
      if (b.type === 'if') { walk(b.trueBody); walk(b.falseBody); }
      else if (b.type === 'while' || b.type === 'dowhile' || b.type === 'for') { walk(b.body); }
    }
  })(routine.body);
  return lists;
}

export function findRoutine(program, name) {
  return program.routines.find((r) => r.name.toLowerCase() === (name || '').toLowerCase());
}

export function isNameTaken(program, name, excludeRoutine = null) {
  return program.routines.some(
    (r) => r !== excludeRoutine && r.name.toLowerCase() === name.toLowerCase(),
  );
}

// Recursively finds and removes a block by id from anywhere in the routine
// (top level or nested inside if/while/dowhile/for bodies).
export function removeBlockById(routine, blockId) {
  function walk(list) {
    const idx = list.findIndex((b) => b.id === blockId);
    if (idx >= 0) { list.splice(idx, 1); return true; }
    for (const b of list) {
      if (b.type === 'if') { if (walk(b.trueBody) || walk(b.falseBody)) return true; }
      else if (b.body) { if (walk(b.body)) return true; }
    }
    return false;
  }
  return walk(routine.body);
}
