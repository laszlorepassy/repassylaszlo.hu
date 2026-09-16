// Save/Open .fprg files. Everything happens through Blob downloads and
// FileReader uploads — there is no network call anywhere in this module,
// so a program never leaves the browser except via an explicit file the
// user chooses to save.
//
// Two XML dialects are understood on Open: this app's own (root element
// <flowchart>, blocks as <block type="...">) and *real* Flowgorithm's
// (root element <flowgorithm>, each block a differently-named tag such as
// <declare>/<if>/<while>), reverse-engineered from real .fprg files and
// Flowgorithm's own "Statements" reference. Save always writes this app's
// own dialect.
import { newBlock, newRoutine } from './model.js';
import { parseExpr, nodeToSource } from './expr.js';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function blockToXml(b, depth) {
  const pad = '  '.repeat(depth);
  switch (b.type) {
    case 'declare':
      return `${pad}<block type="declare" var="${esc(b.varName)}" varType="${esc(b.varType)}"${b.isArray ? ` array="1" size="${esc(b.arraySize)}"` : ''}/>\n`;
    case 'assign':
      return `${pad}<block type="assign" var="${esc(b.varName)}" expr="${esc(b.expr)}"/>\n`;
    case 'input':
      return `${pad}<block type="input" var="${esc(b.varName)}" prompt="${esc(b.prompt)}"/>\n`;
    case 'output':
      return `${pad}<block type="output" expr="${esc(b.expr)}" newline="${b.newline ? '1' : '0'}"/>\n`;
    case 'comment':
      return `${pad}<block type="comment" text="${esc(b.text)}"/>\n`;
    case 'call': {
      let s = `${pad}<block type="call" routine="${esc(b.routine)}">\n`;
      for (const a of b.args) s += `${pad}  <arg expr="${esc(a)}"/>\n`;
      s += `${pad}</block>\n`;
      return s;
    }
    case 'if': {
      let s = `${pad}<block type="if" cond="${esc(b.cond)}">\n`;
      s += `${pad}  <true>\n${bodyToXml(b.trueBody, depth + 2)}${pad}  </true>\n`;
      s += `${pad}  <false>\n${bodyToXml(b.falseBody, depth + 2)}${pad}  </false>\n`;
      s += `${pad}</block>\n`;
      return s;
    }
    case 'while':
    case 'dowhile': {
      let s = `${pad}<block type="${b.type}" cond="${esc(b.cond)}">\n`;
      s += `${pad}  <body>\n${bodyToXml(b.body, depth + 2)}${pad}  </body>\n`;
      s += `${pad}</block>\n`;
      return s;
    }
    case 'for': {
      let s = `${pad}<block type="for" var="${esc(b.varName)}" start="${esc(b.start)}" end="${esc(b.end)}" step="${esc(b.step)}">\n`;
      s += `${pad}  <body>\n${bodyToXml(b.body, depth + 2)}${pad}  </body>\n`;
      s += `${pad}</block>\n`;
      return s;
    }
    default:
      return '';
  }
}

function bodyToXml(list, depth) {
  return list.map((b) => blockToXml(b, depth)).join('');
}

export function programToFprg(program) {
  let out = '<?xml version="1.0" encoding="UTF-8"?>\n';
  out += '<flowchart app="Flowchart Web" version="1.0">\n';
  out += '  <routines>\n';
  for (const r of program.routines) {
    out += `    <routine name="${esc(r.name)}" kind="${esc(r.kind)}"${r.returnType ? ` returnType="${esc(r.returnType)}"` : ''}>\n`;
    if (r.params.length) {
      out += '      <params>\n';
      for (const p of r.params) out += `        <param name="${esc(p.name)}" type="${esc(p.type)}"${p.byRef ? ' byRef="1"' : ''}/>\n`;
      out += '      </params>\n';
    }
    out += `      <body>\n${bodyToXml(r.body, 4)}      </body>\n`;
    out += '    </routine>\n';
  }
  out += '  </routines>\n';
  out += '</flowchart>\n';
  return out;
}

function elBody(el) {
  const bodyEl = el.querySelector(':scope > body');
  return bodyEl ? childBlocks(bodyEl) : [];
}

function childBlocks(parentEl) {
  const blocks = [];
  for (const el of parentEl.children) {
    if (el.tagName !== 'block') continue;
    const type = el.getAttribute('type');
    switch (type) {
      case 'declare':
        blocks.push(newBlock('declare', {
          varName: el.getAttribute('var') || 'x',
          varType: el.getAttribute('varType') || 'Integer',
          isArray: el.getAttribute('array') === '1',
          arraySize: el.getAttribute('size') || '10',
        }));
        break;
      case 'assign':
        blocks.push(newBlock('assign', { varName: el.getAttribute('var') || 'x', expr: el.getAttribute('expr') || '0' }));
        break;
      case 'input':
        blocks.push(newBlock('input', { varName: el.getAttribute('var') || 'x', prompt: el.getAttribute('prompt') || '' }));
        break;
      case 'output':
        blocks.push(newBlock('output', { expr: el.getAttribute('expr') || '""', newline: el.getAttribute('newline') !== '0' }));
        break;
      case 'comment':
        blocks.push(newBlock('comment', { text: el.getAttribute('text') || '' }));
        break;
      case 'call': {
        const args = [...el.querySelectorAll(':scope > arg')].map((a) => a.getAttribute('expr') || '');
        blocks.push(newBlock('call', { routine: el.getAttribute('routine') || '', args }));
        break;
      }
      case 'if': {
        const trueEl = el.querySelector(':scope > true');
        const falseEl = el.querySelector(':scope > false');
        blocks.push(newBlock('if', {
          cond: el.getAttribute('cond') || 'True',
          trueBody: trueEl ? childBlocks(trueEl) : [],
          falseBody: falseEl ? childBlocks(falseEl) : [],
        }));
        break;
      }
      case 'while':
      case 'dowhile':
        blocks.push(newBlock(type, { cond: el.getAttribute('cond') || 'True', body: elBody(el) }));
        break;
      case 'for':
        blocks.push(newBlock('for', {
          varName: el.getAttribute('var') || 'i',
          start: el.getAttribute('start') || '1',
          end: el.getAttribute('end') || '10',
          step: el.getAttribute('step') || '1',
          body: elBody(el),
        }));
        break;
      default:
        break;
    }
  }
  return blocks;
}

export function fprgToProgram(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('XML parse error');
  if (doc.querySelector('flowgorithm')) return parseRealFlowgorithm(doc);
  const root = doc.querySelector('flowchart');
  if (!root) throw new Error('Not a valid .fprg file');
  const routines = [];
  for (const rEl of root.querySelectorAll('routines > routine')) {
    const kind = rEl.getAttribute('kind') || 'procedure';
    const r = newRoutine(rEl.getAttribute('name') || 'Routine', kind);
    r.returnType = rEl.getAttribute('returnType') || (kind === 'function' ? 'Integer' : null);
    const paramsEl = rEl.querySelector(':scope > params');
    if (paramsEl) {
      r.params = [...paramsEl.querySelectorAll(':scope > param')].map((p) => ({
        name: p.getAttribute('name') || 'p', type: p.getAttribute('type') || 'Integer', byRef: p.getAttribute('byRef') === '1',
      }));
    }
    const bodyEl = rEl.querySelector(':scope > body');
    r.body = bodyEl ? childBlocks(bodyEl) : [];
    routines.push(r);
  }
  if (routines.length === 0) throw new Error('No routines found');
  return { routines };
}

// ---- real Flowgorithm (.fprg produced by the actual desktop app) ----

function realDeclareBlocks(el) {
  // A real Declare can name several variables at once ("N,N2,N3"), sharing
  // one type/array/size — split into one internal declare block per name.
  const names = (el.getAttribute('name') || el.getAttribute('variables') || 'x').split(',').map((s) => s.trim()).filter(Boolean);
  const isArray = el.getAttribute('array') === 'True';
  const varType = el.getAttribute('type') || 'Integer';
  const size = el.getAttribute('size') || '10';
  return names.map((n) => newBlock('declare', { varName: n, varType, isArray, arraySize: isArray ? size : '10' }));
}

function realCallBlock(el) {
  const exprText = el.getAttribute('expression') || '';
  try {
    const node = parseExpr(exprText);
    if (node.kind === 'call') {
      return newBlock('call', { routine: node.name, args: node.args.map(nodeToSource) });
    }
  } catch { /* fall through to a best-effort literal routine name below */ }
  return newBlock('call', { routine: exprText, args: [] });
}

function realChildBlocks(parentEl) {
  const blocks = [];
  for (const el of parentEl.children) {
    switch (el.tagName) {
      case 'declare': blocks.push(...realDeclareBlocks(el)); break;
      case 'assign': blocks.push(newBlock('assign', { varName: el.getAttribute('variable') || 'x', expr: el.getAttribute('expression') || '0' })); break;
      case 'input': blocks.push(newBlock('input', { varName: el.getAttribute('variable') || 'x', prompt: '' })); break;
      case 'output': blocks.push(newBlock('output', { expr: el.getAttribute('expression') || '""', newline: el.getAttribute('newline') !== 'False' })); break;
      case 'comment': blocks.push(newBlock('comment', { text: el.getAttribute('text') || '' })); break;
      case 'call': blocks.push(realCallBlock(el)); break;
      case 'if': {
        const thenEl = el.querySelector(':scope > then');
        const elseEl = el.querySelector(':scope > else');
        blocks.push(newBlock('if', {
          cond: el.getAttribute('expression') || 'True',
          trueBody: thenEl ? realChildBlocks(thenEl) : [],
          falseBody: elseEl ? realChildBlocks(elseEl) : [],
        }));
        break;
      }
      case 'while': blocks.push(newBlock('while', { cond: el.getAttribute('expression') || 'True', body: realChildBlocks(el) })); break;
      case 'do': blocks.push(newBlock('dowhile', { cond: el.getAttribute('expression') || 'True', body: realChildBlocks(el) })); break;
      case 'for': {
        // A real Flowgorithm For loop's actual direction comes from its
        // "direction" attribute ("inc"/"dec"), not from the sign of its
        // step value — a "dec" loop with step="1" counts *down*.
        const rawStep = el.getAttribute('step') || '1';
        const step = el.getAttribute('direction') === 'dec' ? `-(${rawStep})` : rawStep;
        blocks.push(newBlock('for', {
          varName: el.getAttribute('variable') || 'i',
          start: el.getAttribute('start') || '1',
          end: el.getAttribute('end') || '10',
          step,
          body: realChildBlocks(el),
        }));
        break;
      }
        break;
      default: break; // unknown/placeholder tags (e.g. a template's <more/>) are skipped
    }
  }
  return blocks;
}

function parseRealFlowgorithm(doc) {
  const root = doc.querySelector('flowgorithm');
  const routines = [];
  for (const fEl of root.querySelectorAll(':scope > function')) {
    const name = fEl.getAttribute('name') || 'Routine';
    const typeAttr = fEl.getAttribute('type') || 'None';
    const isMain = name === 'Main';
    const kind = isMain ? 'main' : (typeAttr === 'None' ? 'procedure' : 'function');
    const r = newRoutine(name, kind);
    if (kind === 'function') {
      r.returnType = typeAttr;
      const varAttr = fEl.getAttribute('variable') || '';
      if (varAttr && varAttr !== name) r.returnVar = varAttr;
    }
    r.params = [...fEl.querySelectorAll(':scope > parameters > parameter')].map((p) => ({
      name: p.getAttribute('name') || 'p',
      type: p.getAttribute('type') || 'Integer',
      byRef: p.getAttribute('reference') === 'True' || p.getAttribute('array') === 'True',
    }));
    const bodyEl = fEl.querySelector(':scope > body');
    r.body = bodyEl ? realChildBlocks(bodyEl) : [];
    routines.push(r);
  }
  if (routines.length === 0) throw new Error('No routines found');
  if (!routines.some((r) => r.kind === 'main')) routines[0].kind = 'main';
  return { routines };
}

export function downloadFile(filename, text, mime = 'application/xml') {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function pickFprgFile() {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.fprg,application/xml,text/xml';
    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      if (!file) { resolve(null); return; }
      const reader = new FileReader();
      reader.onload = () => resolve({ name: file.name, text: String(reader.result) });
      reader.onerror = () => resolve(null);
      reader.readAsText(file);
    });
    input.click();
  });
}
