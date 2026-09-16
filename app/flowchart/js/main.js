import { t, setLang, getLang, initLang } from './i18n.js';
import { newProgram, newRoutine, removeBlockById, cloneBlock } from './model.js';
import { renderRoutine, highlightBlock } from './render.js';
import { openInsertMenu, openBlockEditor, openRoutineEditor, showConfirm, showAlert } from './blockEditor.js';
import { runProgram, formatValue } from './interpreter.js';
import { generatePython } from './codegen.js';
import { programToFprg, fprgToProgram, downloadFile, pickFprgFile } from './fileio.js';

initLang();

let program = newProgram();
let currentRoutineIndex = 0;
let hitMap = new Map();
let clipboard = null; // a cut block, ready to be pasted at a connector

const runState = { gen: null, running: false, done: false };

const el = (id) => document.getElementById(id);
const svgRoot = el('flowSvg');

function currentRoutine() { return program.routines[currentRoutineIndex]; }

// ---------- rendering ----------
// Declare's "Variable Names" field can produce sibling blocks beyond the
// one being edited/inserted (comma-separated names, Flowgorithm-style);
// splice those in right after it, then redraw.
function handleBlockSaved(list, block, extraBlocks) {
  if (extraBlocks && extraBlocks.length) {
    const idx = list.indexOf(block);
    if (idx >= 0) list.splice(idx + 1, 0, ...extraBlocks);
  }
  rerenderDiagram();
}

function updateClipboardStatus() {
  const badge = el('clipboardStatus');
  if (!clipboard) { badge.textContent = ''; badge.hidden = true; return; }
  badge.hidden = false;
  badge.textContent = `✂ ${t(`block${clipboard.type[0].toUpperCase()}${clipboard.type.slice(1)}`)} — ${t('clipboardHint')}`;
}

function doInsert(list, index) {
  openInsertMenu(list, index, program, (block) => {
    rerenderDiagram();
    // Matches Flowgorithm: picking a symbol immediately opens it for editing.
    openBlockEditor(block, program, (saved, extra) => handleBlockSaved(list, saved, extra), (b) => {
      removeBlockById(currentRoutine(), b.id);
      rerenderDiagram();
    });
  });
}

function rerenderDiagram() {
  const deleteBlock = (block) => {
    removeBlockById(currentRoutine(), block.id);
    rerenderDiagram();
  };
  const cbs = {
    onInsert: doInsert,
    onEdit: (block, list) => {
      openBlockEditor(block, program, (saved, extra) => handleBlockSaved(list || currentRoutine().body, saved, extra), deleteBlock);
    },
    // Right-click a symbol to cut it (removes it and holds it); right-click
    // a connector to paste whatever was last cut there.
    onCut: (block, list) => {
      const target = list || currentRoutine().body;
      const idx = target.indexOf(block);
      if (idx < 0) return;
      target.splice(idx, 1);
      clipboard = cloneBlock(block);
      updateClipboardStatus();
      rerenderDiagram();
    },
    onPaste: (list, index) => {
      if (!clipboard) { doInsert(list, index); return; }
      list.splice(index, 0, clipboard);
      clipboard = null;
      updateClipboardStatus();
      rerenderDiagram();
    },
    onDelete: deleteBlock,
  };
  const res = renderRoutine(svgRoot, currentRoutine(), cbs);
  hitMap = res.hitMap;
}

function renderRoutineTabs() {
  const wrap = el('routineTabs');
  wrap.innerHTML = '';
  program.routines.forEach((r, idx) => {
    const tab = document.createElement('div');
    tab.className = `routine-tab${idx === currentRoutineIndex ? ' active' : ''}`;
    const label = document.createElement('span');
    label.textContent = r.kind === 'main' ? t('routineMain') : r.name;
    tab.appendChild(label);
    if (r.kind !== 'main') {
      const editIcon = document.createElement('span');
      editIcon.className = 'edit-icon';
      editIcon.textContent = '✎';
      editIcon.title = t('editRoutine');
      editIcon.addEventListener('click', (ev) => {
        ev.stopPropagation();
        openRoutineEditor(r, program, {
          onSave: (data) => { Object.assign(r, data); renderRoutineTabs(); rerenderDiagram(); },
          onDelete: () => {
            const delIdx = program.routines.indexOf(r);
            program.routines.splice(delIdx, 1);
            if (currentRoutineIndex >= program.routines.length) currentRoutineIndex = 0;
            else if (delIdx < currentRoutineIndex) currentRoutineIndex -= 1;
            renderRoutineTabs();
            rerenderDiagram();
          },
        });
      });
      tab.appendChild(editIcon);
    }
    tab.addEventListener('click', () => {
      currentRoutineIndex = idx;
      renderRoutineTabs();
      rerenderDiagram();
    });
    wrap.appendChild(tab);
  });
  const addBtn = document.createElement('button');
  addBtn.className = 'routine-tab-add';
  addBtn.textContent = t('addRoutine');
  addBtn.addEventListener('click', () => {
    openRoutineEditor(null, program, {
      onSave: (data) => {
        const r = newRoutine(data.name, data.kind);
        r.returnType = data.returnType;
        r.params = data.params;
        program.routines.push(r);
        currentRoutineIndex = program.routines.length - 1;
        renderRoutineTabs();
        rerenderDiagram();
      },
    });
  });
  wrap.appendChild(addBtn);
}

// ---------- side tabs ----------
function switchSideTab(name) {
  document.querySelectorAll('.side-tab').forEach((b) => b.classList.toggle('active', b.dataset.tab === name));
  document.querySelectorAll('.tab-content').forEach((c) => c.classList.toggle('active', c.id === `tab${name[0].toUpperCase()}${name.slice(1)}`));
}
document.querySelectorAll('.side-tab').forEach((btn) => btn.addEventListener('click', () => switchSideTab(btn.dataset.tab)));

// ---------- variables panel ----------
function updateVarsPanel(scope) {
  const tbody = el('varsBody');
  tbody.innerHTML = '';
  if (!scope) return;
  for (const v of scope.entries()) {
    const tr = document.createElement('tr');
    const tdN = document.createElement('td'); tdN.textContent = v.name;
    const tdT = document.createElement('td'); tdT.textContent = v.type;
    const tdV = document.createElement('td'); tdV.textContent = formatValue(v.value);
    tr.append(tdN, tdT, tdV);
    tbody.appendChild(tr);
  }
}
function clearVarsPanel() { el('varsBody').innerHTML = ''; }

// ---------- console ----------
// Appends as DOM nodes (not `textContent +=`), so an earlier system-message
// span keeps its color instead of being flattened back to plain text by a
// later plain-text append.
function appendConsole(str, newline) {
  const out = el('consoleOutput');
  out.appendChild(document.createTextNode(str + (newline ? '\n' : '')));
  out.scrollTop = out.scrollHeight;
}
// A run-lifecycle notice (started/finished/stopped/error), shown inline in
// the console so the whole run reads as one log: errors red, other system
// notices green, the program's own Output text plain white — all on the
// same black background.
function logSystemMessage(str, kind) {
  const out = el('consoleOutput');
  const span = document.createElement('span');
  span.className = kind === 'error' ? 'console-error-line' : 'console-success-line';
  span.textContent = str;
  out.appendChild(span);
  out.appendChild(document.createTextNode('\n'));
  out.scrollTop = out.scrollHeight;
}
function clearConsole() { el('consoleOutput').textContent = ''; }
function setStatus(msg) { el('runStatus').textContent = msg; }

function requestInputFromUser(ev) {
  switchSideTab('console');
  const row = el('inputRow');
  const label = el('inputLabel');
  const field = el('inputField');
  const submit = el('inputSubmit');
  label.textContent = `${ev.prompt || `${t('inputPromptDefault')} ${ev.varName}`}`;
  field.value = '';
  row.hidden = false;
  field.focus();
  setStatus(t('waitingForInput'));
  return new Promise((resolve) => {
    function done() {
      row.hidden = true;
      submit.removeEventListener('click', done);
      field.removeEventListener('keydown', onKey);
      // Echo what was typed into the console log, like a real console would,
      // so the run's log shows both what the program asked for and what it got.
      appendConsole(`${ev.varName} = ${field.value}`, true);
      resolve(field.value);
    }
    function onKey(e) { if (e.key === 'Enter') done(); }
    submit.addEventListener('click', done);
    field.addEventListener('keydown', onKey);
  });
}

// ---------- run driver ----------
function delay(ms) { return new Promise((r) => setTimeout(r, ms)); }
function currentDelayMs() { return Math.round((100 - Number(el('speedRange').value)) * 6); }

function switchToRoutineTab(routine) {
  if (!routine) return;
  const idx = program.routines.indexOf(routine);
  if (idx >= 0 && idx !== currentRoutineIndex) {
    currentRoutineIndex = idx;
    renderRoutineTabs();
    rerenderDiagram();
  }
}

function makeIo() { return { output: appendConsole }; }

function ensureGenStarted() {
  if (!runState.gen) {
    clearConsole();
    clearVarsPanel();
    setStatus('');
    runState.gen = runProgram(program, makeIo());
    runState.done = false;
  }
}

function errorText(err) {
  const m = err && err.message ? err.message : String(err);
  const [code, rest] = m.includes(':') ? [m.slice(0, m.indexOf(':')), m.slice(m.indexOf(':') + 1)] : [m, ''];
  switch (code) {
    case 'UNDECLARED': return t('errUndeclaredVar', rest);
    case 'ALREADY_DECLARED': return t('errAlreadyDeclared', rest);
    case 'UNKNOWN_ROUTINE': return t('errUnknownRoutine', rest);
    case 'NOT_ARRAY': return t('errNotArray', rest);
    case 'ARRAY_NEEDS_INDEX': return t('errArrayNeedsIndex', rest);
    case 'INDEX_OUT_OF_RANGE': return t('errIndexOutOfRange', rest);
    case 'BYREF_NEEDS_VARIABLE': return t('errByRefNeedsVariable', rest);
    case 'INVALID_ASSIGN_TARGET': return t('errInvalidAssignTarget', rest);
    case 'TOO_MANY_STEPS': return t('errTooManySteps');
    default: return `${t('errRuntime')}: ${m}`;
  }
}

function handleRuntimeError(err) {
  const msg = errorText(err);
  setStatus(msg);
  logSystemMessage(msg, 'error');
  if (err && err.blockId) highlightBlock(hitMap, err.blockId);
  switchSideTab('console');
}

async function pumpOnce(feedValue) {
  if (!runState.gen || runState.done) return { done: true };
  let res;
  try { res = runState.gen.next(feedValue); } catch (err) { runState.done = true; handleRuntimeError(err); return { done: true, errored: true }; }
  if (res.done) { runState.done = true; return { done: true }; }
  const evVal = res.value;
  switchToRoutineTab(evVal.routine);
  highlightBlock(hitMap, evVal.blockId);
  if (evVal.scope) updateVarsPanel(evVal.scope);
  return { done: false, ev: evVal };
}

function finishRun(errored) {
  runState.running = false;
  setRunButtonsState();
  if (!errored) {
    setStatus(t('programFinished'));
    logSystemMessage(t('programFinished'), 'success');
    highlightBlock(hitMap, null);
  }
}

async function onStepClick() {
  ensureGenStarted();
  const r1 = await pumpOnce(undefined);
  if (r1.done) { finishRun(r1.errored); return; }
  if (r1.ev.kind === 'input') {
    const val = await requestInputFromUser(r1.ev);
    const r2 = await pumpOnce(val);
    if (r2.done) finishRun(r2.errored);
  }
}

async function onRunClick() {
  ensureGenStarted();
  if (runState.done) return;
  runState.running = true;
  setRunButtonsState();
  while (runState.running && !runState.done) {
    const r = await pumpOnce(undefined);
    if (r.done) { finishRun(r.errored); break; }
    let ev = r.ev;
    if (ev.kind === 'input') {
      const val = await requestInputFromUser(ev);
      if (!runState.running) { await pumpOnce(val); break; }
      const r2 = await pumpOnce(val);
      if (r2.done) { finishRun(r2.errored); break; }
    }
    if (!runState.running) break;
    await delay(currentDelayMs());
  }
  setRunButtonsState();
}

function onPauseClick() {
  runState.running = false;
  setRunButtonsState();
  setStatus(t('programStopped'));
  logSystemMessage(t('programStopped'), 'success');
}

function onResetClick() {
  runState.gen = null;
  runState.done = false;
  runState.running = false;
  highlightBlock(hitMap, null);
  clearVarsPanel();
  clearConsole();
  setStatus('');
  el('inputRow').hidden = true;
  setRunButtonsState();
}

function setRunButtonsState() {
  el('btnRun').disabled = runState.running;
  el('btnStep').disabled = runState.running;
  el('btnPause').disabled = !runState.running;
}

// ---------- code export ----------
function refreshCode() {
  el('codeOutput').textContent = generatePython(program);
}

// ---------- image export ----------
// The diagram's colors come from css/style.css classes, which a standalone
// exported file has no access to — so the export gets its own small,
// self-contained copy of just the rules it needs.
const EXPORT_SVG_STYLE = `
  .flow-text { font: 12px sans-serif; fill: #1f2937; }
  .branch-label { font: 600 11px sans-serif; fill: #6b7280; }
  .flow-line { stroke: #64748b; stroke-width: 1.6; fill: none; }
  .arrow-fill { fill: #64748b; }
  .shape { stroke-width: 1.6; }
  .shape-terminal { fill: #ecfdf5; stroke: #047857; }
  .shape-declare, .shape-assign { fill: #eef2ff; stroke: #4338ca; }
  .shape-input, .shape-output { fill: #eff6ff; stroke: #1d4ed8; }
  .shape-decision { fill: #fff7ed; stroke: #c2410c; }
  .shape-call { fill: #f5f3ff; stroke: #6d28d9; }
  .shape-comment { fill: #fffbeb; stroke: #b45309; stroke-dasharray: 3 2; }
  .shape-innerline { stroke: #6d28d9; stroke-width: 1.2; }
`;

function buildExportSvgString() {
  const src = svgRoot;
  const clone = src.cloneNode(true);
  const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  styleEl.textContent = EXPORT_SVG_STYLE;
  clone.insertBefore(styleEl, clone.firstChild);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  return new XMLSerializer().serializeToString(clone);
}

function exportDiagramAsImage(name) {
  const width = Number(svgRoot.getAttribute('width')) || 800;
  const height = Number(svgRoot.getAttribute('height')) || 600;
  const scale = 2;
  const svgBlob = new Blob([buildExportSvgString()], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    canvas.toBlob((blob) => {
      const a = document.createElement('a');
      const dlUrl = URL.createObjectURL(blob);
      a.href = dlUrl;
      a.download = `${name}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(dlUrl), 1000);
    }, 'image/png');
  };
  img.onerror = () => { URL.revokeObjectURL(url); showAlert(t('errGeneric')); };
  img.src = url;
}

// ---------- file menu ----------
function resetAllAndRerender() {
  onResetClick();
  currentRoutineIndex = 0;
  renderRoutineTabs();
  rerenderDiagram();
}

function programName() {
  const raw = (el('programName').value || 'program').trim() || 'program';
  return raw.replace(/[\\/:*?"<>|]/g, '_');
}

el('clipboardStatus').addEventListener('click', () => {
  clipboard = null;
  updateClipboardStatus();
});

el('btnNew').addEventListener('click', async () => {
  if (await showConfirm(t('confirmNewProgram'))) {
    program = newProgram();
    clipboard = null;
    updateClipboardStatus();
    resetAllAndRerender();
  }
});

el('btnOpen').addEventListener('click', async () => {
  const file = await pickFprgFile();
  if (!file) return;
  try {
    program = fprgToProgram(file.text);
    clipboard = null;
    updateClipboardStatus();
    resetAllAndRerender();
  } catch (err) {
    await showAlert(t('fileLoadError'));
  }
});

el('btnSave').addEventListener('click', () => {
  downloadFile(`${programName()}.fprg`, programToFprg(program));
});

el('btnGenerateCode').addEventListener('click', refreshCode);

el('btnExportImage').addEventListener('click', () => { exportDiagramAsImage(programName()); });

el('btnCopyCode').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(el('codeOutput').textContent); } catch { /* clipboard may be unavailable */ }
});
el('btnDownloadCode').addEventListener('click', () => {
  downloadFile(`${programName()}.py`, el('codeOutput').textContent, 'text/x-python');
});

el('btnRun').addEventListener('click', onRunClick);
el('btnStep').addEventListener('click', onStepClick);
el('btnPause').addEventListener('click', onPauseClick);
el('btnReset').addEventListener('click', onResetClick);

// ---------- i18n wiring ----------
function applyStaticStrings() {
  el('brandTitle').textContent = t('appTitle');
  document.title = t('appTitle');
  el('btnNew').textContent = t('menuNew');
  el('btnOpen').textContent = t('menuOpen');
  el('btnSave').textContent = t('menuSave');
  el('btnGenerateCode').textContent = t('generateCode');
  el('btnExportImage').textContent = t('menuExportImage');
  el('programName').placeholder = t('programNamePlaceholder');
  el('speedLabel').textContent = t('speed');
  el('btnRun').title = t('run');
  el('btnStep').title = t('step');
  el('btnPause').title = t('pause');
  el('btnReset').title = t('reset');
  el('tabBtnVars').textContent = t('tabVariables');
  el('tabBtnConsole').textContent = t('tabConsole');
  el('tabBtnCode').textContent = t('tabCode');
  el('thName').textContent = t('varName');
  el('thType').textContent = t('varType');
  el('thValue').textContent = t('varValue');
  el('inputSubmit').textContent = t('submit');
  el('btnCopyCode').textContent = t('copyCode');
  el('btnDownloadCode').textContent = t('downloadCode');
  document.documentElement.lang = getLang();
}

el('langSelect').value = getLang();
el('langSelect').addEventListener('change', (ev) => {
  setLang(ev.target.value);
  applyStaticStrings();
  renderRoutineTabs();
  rerenderDiagram();
  refreshCode();
  updateClipboardStatus();
});

// ---------- boot ----------
applyStaticStrings();
renderRoutineTabs();
rerenderDiagram();
setRunButtonsState();
