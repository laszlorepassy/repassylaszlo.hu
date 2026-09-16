// Tokenizer, recursive-descent parser and generator-based evaluator for the
// flowchart expression language (Flowgorithm-style: and/or/not, mod, ^, <>).
import { RuntimeError } from './errors.js';

const KEYWORDS = new Set(['and', 'or', 'not', 'mod', 'div', 'true', 'false']);

function tokenize(src) {
  const tokens = [];
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (c === '"' || c === "'") {
      const quote = c;
      let j = i + 1;
      let s = '';
      while (j < n && src[j] !== quote) {
        if (src[j] === '\\' && j + 1 < n) { s += src[j + 1]; j += 2; } else { s += src[j]; j++; }
      }
      tokens.push({ type: 'STRING', value: s });
      i = j + 1;
      continue;
    }
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(src[i + 1] || ''))) {
      let j = i;
      while (j < n && /[0-9.]/.test(src[j])) j++;
      tokens.push({ type: 'NUMBER', value: parseFloat(src.slice(i, j)) });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_]/.test(src[j])) j++;
      const word = src.slice(i, j);
      const lower = word.toLowerCase();
      tokens.push(KEYWORDS.has(lower) ? { type: 'KW', value: lower } : { type: 'IDENT', value: word });
      i = j;
      continue;
    }
    const two = src.slice(i, i + 2);
    if (['<=', '>=', '<>', '=='].includes(two)) {
      tokens.push({ type: 'OP', value: two === '==' ? '=' : two });
      i += 2;
      continue;
    }
    if (two === '&&') { tokens.push({ type: 'KW', value: 'and' }); i += 2; continue; }
    if (two === '||') { tokens.push({ type: 'KW', value: 'or' }); i += 2; continue; }
    if (two === '!=') { tokens.push({ type: 'OP', value: '<>' }); i += 2; continue; }
    if (c === '!') { tokens.push({ type: 'KW', value: 'not' }); i++; continue; }
    if ('+-*/^%<>=(),[]&'.includes(c)) { tokens.push({ type: 'OP', value: c }); i++; continue; }
    throw new RuntimeError(`Unexpected character "${c}"`);
  }
  tokens.push({ type: 'EOF' });
  return tokens;
}

class Parser {
  constructor(tokens) { this.tokens = tokens; this.pos = 0; }
  peek() { return this.tokens[this.pos]; }
  next() { return this.tokens[this.pos++]; }
  isOp(v) { const t = this.peek(); return t.type === 'OP' && t.value === v; }
  isKw(v) { const t = this.peek(); return t.type === 'KW' && t.value === v; }
  expectOp(v) { if (!this.isOp(v)) throw new RuntimeError(`Expected "${v}"`); this.next(); }

  parse() {
    const node = this.parseOr();
    if (this.peek().type !== 'EOF') throw new RuntimeError(`Unexpected token near "${JSON.stringify(this.peek().value)}"`);
    return node;
  }

  parseOr() {
    let left = this.parseAnd();
    while (this.isKw('or')) { this.next(); left = { kind: 'logical', op: 'or', left, right: this.parseAnd() }; }
    return left;
  }

  parseAnd() {
    let left = this.parseNot();
    while (this.isKw('and')) { this.next(); left = { kind: 'logical', op: 'and', left, right: this.parseNot() }; }
    return left;
  }

  parseNot() {
    if (this.isKw('not')) { this.next(); return { kind: 'not', expr: this.parseNot() }; }
    return this.parseComparison();
  }

  parseComparison() {
    const left = this.parseAdditive();
    const t = this.peek();
    const cmpOps = ['=', '<>', '<', '>', '<=', '>='];
    if (t.type === 'OP' && cmpOps.includes(t.value)) {
      this.next();
      return { kind: 'compare', op: t.value, left, right: this.parseAdditive() };
    }
    return left;
  }

  parseAdditive() {
    let left = this.parseTerm();
    while (this.isOp('+') || this.isOp('-') || this.isOp('&')) {
      const op = this.next().value;
      left = { kind: 'bin', op, left, right: this.parseTerm() };
    }
    return left;
  }

  parseTerm() {
    let left = this.parseUnary();
    while (this.isOp('*') || this.isOp('/') || this.isOp('%') || this.isKw('mod') || this.isKw('div')) {
      const opTok = this.next();
      const op = opTok.type === 'KW' ? opTok.value : opTok.value;
      left = { kind: 'bin', op: op === '%' ? 'mod' : op, left, right: this.parseUnary() };
    }
    return left;
  }

  parseUnary() {
    if (this.isOp('-') || this.isOp('+')) {
      const op = this.next().value;
      return { kind: 'unary', op, expr: this.parseUnary() };
    }
    return this.parsePower();
  }

  parsePower() {
    const base = this.parsePrimary();
    if (this.isOp('^')) { this.next(); return { kind: 'bin', op: '^', left: base, right: this.parseUnary() }; }
    return base;
  }

  parsePrimary() {
    const t = this.peek();
    if (t.type === 'NUMBER') { this.next(); return { kind: 'num', value: t.value }; }
    if (t.type === 'STRING') { this.next(); return { kind: 'str', value: t.value }; }
    if (t.type === 'KW' && (t.value === 'true' || t.value === 'false')) { this.next(); return { kind: 'bool', value: t.value === 'true' }; }
    if (t.type === 'IDENT') {
      this.next();
      const name = t.value;
      if (this.isOp('(')) {
        this.next();
        const args = [];
        if (!this.isOp(')')) {
          args.push(this.parseOr());
          while (this.isOp(',')) { this.next(); args.push(this.parseOr()); }
        }
        this.expectOp(')');
        return { kind: 'call', name, args };
      }
      if (this.isOp('[')) {
        this.next();
        const index = this.parseOr();
        this.expectOp(']');
        return { kind: 'index', name, index };
      }
      return { kind: 'var', name };
    }
    if (t.type === 'OP' && t.value === '(') {
      this.next();
      const inner = this.parseOr();
      this.expectOp(')');
      return inner;
    }
    throw new RuntimeError(`Unexpected token: ${t.type === 'EOF' ? 'end of expression' : JSON.stringify(t.value)}`);
  }
}

const parseCache = new Map();
export function parseExpr(src) {
  const key = src;
  if (parseCache.has(key)) return parseCache.get(key);
  const ast = new Parser(tokenize(src)).parse();
  parseCache.set(key, ast);
  return ast;
}

function toNum(v) { return typeof v === 'boolean' ? (v ? 1 : 0) : Number(v); }
function isNumeric(v) { return typeof v === 'number' || typeof v === 'boolean'; }
function display(v) {
  if (typeof v === 'boolean') return v ? 'True' : 'False';
  if (typeof v === 'number') return String(v);
  return String(v);
}

export const BUILTINS = {
  abs: (a) => Math.abs(toNum(a[0])),
  sqrt: (a) => Math.sqrt(toNum(a[0])),
  round: (a) => Math.round(toNum(a[0])),
  floor: (a) => Math.floor(toNum(a[0])),
  ceil: (a) => Math.ceil(toNum(a[0])),
  ceiling: (a) => Math.ceil(toNum(a[0])),
  trunc: (a) => Math.trunc(toNum(a[0])),
  int: (a) => Math.trunc(toNum(a[0])),
  pow: (a) => Math.pow(toNum(a[0]), toNum(a[1])),
  random: (a) => {
    if (a.length >= 2) { const lo = toNum(a[0]); const hi = toNum(a[1]); return Math.floor(Math.random() * (hi - lo + 1)) + lo; }
    if (a.length === 1) return Math.floor(Math.random() * toNum(a[0]));
    return Math.random();
  },
  length: (a) => (Array.isArray(a[0]) ? a[0].length : display(a[0]).length),
  size: (a) => (Array.isArray(a[0]) ? a[0].length : display(a[0]).length),
  len: (a) => (Array.isArray(a[0]) ? a[0].length : display(a[0]).length),
  left: (a) => display(a[0]).slice(0, toNum(a[1])),
  right: (a) => { const s = display(a[0]); return s.slice(Math.max(0, s.length - toNum(a[1]))); },
  mid: (a) => display(a[0]).slice(toNum(a[1]), toNum(a[1]) + toNum(a[2])),
  upper: (a) => display(a[0]).toUpperCase(),
  lower: (a) => display(a[0]).toLowerCase(),
  trim: (a) => display(a[0]).trim(),
  tostring: (a) => display(a[0]),
  tonumber: (a) => Number(a[0]),
  str: (a) => display(a[0]),
  float: (a) => Number(a[0]),
  concat: (a) => a.map(display).join(''),
  min: (a) => Math.min(...a.map(toNum)),
  max: (a) => Math.max(...a.map(toNum)),
  sign: (a) => Math.sign(toNum(a[0])),
  sin: (a) => Math.sin(toNum(a[0])),
  cos: (a) => Math.cos(toNum(a[0])),
  tan: (a) => Math.tan(toNum(a[0])),
  asin: (a) => Math.asin(toNum(a[0])),
  acos: (a) => Math.acos(toNum(a[0])),
  atan: (a) => Math.atan(toNum(a[0])),
  log: (a) => Math.log(toNum(a[0])),
  log10: (a) => Math.log10(toNum(a[0])),
  // 1-based, matching Flowgorithm's string-indexing convention (distinct
  // from array indexing, which is 0-based via the name[i] syntax).
  char: (a) => (a.length >= 2 ? display(a[0]).charAt(toNum(a[1]) - 1) : String.fromCharCode(toNum(a[0]))),
  ascii: (a) => display(a[0]).charCodeAt(0),
  tocode: (a) => display(a[0]).charCodeAt(0), // older-Flowgorithm-version alias for ascii()
  tochar: (a) => String.fromCharCode(toNum(a[0])), // older-Flowgorithm-version alias for char()
};

// Bare identifiers Flowgorithm treats as built-in constants rather than
// variables (e.g. `Pi * Radius ^ 2`). Only consulted when no variable of
// that name is actually declared, so a program is free to shadow one.
const CONSTANTS = { pi: Math.PI };

// evalExpr is a *generator* so that calling into a user-defined function
// (which may itself contain an Input block) can suspend execution just
// like any other statement, using `yield*` all the way up the call chain.
// ctx = { scope, callFn: function*(name, argValues) -> value }
export function* evalExpr(node, ctx) {
  switch (node.kind) {
    case 'num': return node.value;
    case 'str': return node.value;
    case 'bool': return node.value;
    case 'var': {
      if (!ctx.scope.has(node.name)) {
        const c = CONSTANTS[node.name.toLowerCase()];
        if (c !== undefined) return c;
        throw new RuntimeError(`__UNDECLARED__:${node.name}`);
      }
      return ctx.scope.get(node.name);
    }
    case 'index': {
      if (!ctx.scope.has(node.name)) throw new RuntimeError(`__UNDECLARED__:${node.name}`);
      if (!ctx.scope.isArrayVar(node.name)) throw new RuntimeError(`__NOT_ARRAY__:${node.name}`);
      const arr = ctx.scope.getArray(node.name);
      const idx = Math.trunc(toNum(yield* evalExpr(node.index, ctx)));
      if (idx < 0 || idx >= arr.length) throw new RuntimeError(`__INDEX_OUT_OF_RANGE__:${node.name}`);
      return arr[idx];
    }
    case 'unary': {
      const v = toNum(yield* evalExpr(node.expr, ctx));
      return node.op === '-' ? -v : v;
    }
    case 'not': {
      const v = yield* evalExpr(node.expr, ctx);
      return !v;
    }
    case 'logical': {
      const l = yield* evalExpr(node.left, ctx);
      if (node.op === 'and' && !l) return false;
      if (node.op === 'or' && l) return true;
      const r = yield* evalExpr(node.right, ctx);
      return !!r;
    }
    case 'compare': {
      const l = yield* evalExpr(node.left, ctx);
      const r = yield* evalExpr(node.right, ctx);
      const bothNumeric = isNumeric(l) && isNumeric(r);
      const a = bothNumeric ? toNum(l) : display(l);
      const b = bothNumeric ? toNum(r) : display(r);
      switch (node.op) {
        case '=': return a === b;
        case '<>': return a !== b;
        case '<': return a < b;
        case '>': return a > b;
        case '<=': return a <= b;
        case '>=': return a >= b;
      }
      break;
    }
    case 'bin': {
      const l = yield* evalExpr(node.left, ctx);
      const r = yield* evalExpr(node.right, ctx);
      if (node.op === '&') return display(l) + display(r);
      if (node.op === '+' && (typeof l === 'string' || typeof r === 'string')) return display(l) + display(r);
      const a = toNum(l);
      const b = toNum(r);
      switch (node.op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        case '^': return Math.pow(a, b);
        case 'mod': return ((a % b) + b) % b;
        case 'div': return Math.trunc(a / b);
      }
      break;
    }
    case 'call': {
      const fn = BUILTINS[node.name.toLowerCase()];
      if (fn) {
        const args = [];
        for (const a of node.args) args.push(yield* evalExpr(a, ctx));
        return fn(args);
      }
      // User routines receive the *unevaluated* argument nodes (not values):
      // a by-reference parameter needs the caller's variable name, not its
      // current value, so the interpreter decides per-parameter whether to
      // evaluate an argument or alias it.
      return yield* ctx.callFn(node.name, node.args, ctx);
    }
  }
  throw new RuntimeError(`Cannot evaluate expression node: ${node.kind}`);
}

export function exprToPython(src) {
  return nodeToPython(parseExpr(src));
}

function pyStrLit(s) {
  return `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function nodeToPython(node) {
  switch (node.kind) {
    case 'num': return String(node.value);
    case 'str': return pyStrLit(node.value);
    case 'bool': return node.value ? 'True' : 'False';
    case 'var': return node.name.toLowerCase() === 'pi' ? 'math.pi' : node.name;
    case 'index': return `${node.name}[int(${nodeToPython(node.index)})]`;
    case 'unary': return `${node.op}${nodeToPython(node.expr)}`;
    case 'not': return `(not ${nodeToPython(node.expr)})`;
    case 'logical': return `(${nodeToPython(node.left)} ${node.op} ${nodeToPython(node.right)})`;
    case 'compare': {
      const opMap = { '=': '==', '<>': '!=', '<': '<', '>': '>', '<=': '<=', '>=': '>=' };
      return `(${nodeToPython(node.left)} ${opMap[node.op]} ${nodeToPython(node.right)})`;
    }
    case 'bin': {
      if (node.op === '&') return `(str(${nodeToPython(node.left)}) + str(${nodeToPython(node.right)}))`;
      if (node.op === 'mod') return `(${nodeToPython(node.left)} % ${nodeToPython(node.right)})`;
      if (node.op === 'div') return `(${nodeToPython(node.left)} // ${nodeToPython(node.right)})`;
      if (node.op === '^') return `(${nodeToPython(node.left)} ** ${nodeToPython(node.right)})`;
      return `(${nodeToPython(node.left)} ${node.op} ${nodeToPython(node.right)})`;
    }
    case 'call': {
      const nameMap = {
        abs: 'abs', sqrt: 'math.sqrt', round: 'round', floor: 'math.floor', ceil: 'math.ceil', ceiling: 'math.ceil',
        trunc: 'math.trunc', int: 'int', pow: 'pow', length: 'len', size: 'len', len: 'len',
        upper: 'str.upper', lower: 'str.lower', trim: 'str.strip', tostring: 'str', tonumber: 'float',
        str: 'str', float: 'float', min: 'min', max: 'max', sin: 'math.sin', cos: 'math.cos', tan: 'math.tan',
        asin: 'math.asin', acos: 'math.acos', atan: 'math.atan', log: 'math.log', log10: 'math.log10',
      };
      const lower = node.name.toLowerCase();
      const args = node.args.map(nodeToPython);
      if (lower === 'random') {
        if (args.length >= 2) return `random.randint(${args[0]}, ${args[1]})`;
        if (args.length === 1) return `random.randrange(${args[0]})`;
        return 'random.random()';
      }
      if (lower === 'left') return `${args[0]}[:${args[1]}]`;
      if (lower === 'right') return `${args[0]}[-(${args[1]}):]`;
      if (lower === 'mid') return `${args[0]}[${args[1]}:${args[1]}+${args[2]}]`;
      if (['upper', 'lower', 'trim'].includes(lower)) return `${args[0]}.${lower === 'trim' ? 'strip' : lower}()`;
      if (lower === 'sign') return `((${args[0]} > 0) - (${args[0]} < 0))`;
      if (lower === 'char' || lower === 'tochar') return args.length >= 2 ? `${args[0]}[int(${args[1]}) - 1]` : `chr(int(${args[0]}))`;
      if (lower === 'ascii' || lower === 'tocode') return `ord((${args[0]})[0])`;
      if (lower === 'concat') return `"".join(str(_x) for _x in [${args.join(', ')}])`;
      if (nameMap[lower]) return `${nameMap[lower]}(${args.join(', ')})`;
      return `${node.name}(${args.join(', ')})`;
    }
  }
  return '';
}

// Serializes an AST node back into *this app's own* expression syntax
// (used when importing a real Flowgorithm file, whose Call blocks store a
// single "routine(arg1, arg2)" expression string rather than separate
// routine/argument fields).
export function nodeToSource(node) {
  switch (node.kind) {
    case 'num': return String(node.value);
    case 'str': return `"${String(node.value).replace(/"/g, '\\"')}"`;
    case 'bool': return node.value ? 'True' : 'False';
    case 'var': return node.name;
    case 'index': return `${node.name}[${nodeToSource(node.index)}]`;
    case 'unary': return `${node.op}${nodeToSource(node.expr)}`;
    case 'not': return `not (${nodeToSource(node.expr)})`;
    case 'logical': return `${nodeToSource(node.left)} ${node.op} ${nodeToSource(node.right)}`;
    case 'compare': return `${nodeToSource(node.left)} ${node.op} ${nodeToSource(node.right)}`;
    case 'bin': return `${nodeToSource(node.left)} ${node.op} ${nodeToSource(node.right)}`;
    case 'call': return `${node.name}(${node.args.map(nodeToSource).join(', ')})`;
    default: return '';
  }
}
