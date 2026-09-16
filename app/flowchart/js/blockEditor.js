// Modal dialogs: pick a block type to insert, edit a block's properties,
// and add/edit/delete routines (procedures & functions).
import { t } from './i18n.js';
import { newBlock, VAR_TYPES, isNameTaken } from './model.js';

const NAME_RE = /^[A-Za-z_][A-Za-z0-9_]*$/;

function modalRoot() { return document.getElementById('modalRoot'); }

function openModal(buildFn) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  const dialog = document.createElement('div');
  dialog.className = 'modal-dialog';
  overlay.appendChild(dialog);
  const close = () => overlay.remove();
  overlay.addEventListener('click', (ev) => { if (ev.target === overlay) close(); });
  document.addEventListener('keydown', function esc(ev) { if (ev.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
  buildFn(dialog, close);
  modalRoot().appendChild(overlay);
  const firstInput = dialog.querySelector('input,select,textarea');
  if (firstInput) firstInput.focus();
  return close;
}

function field(parent, labelText, inputEl) {
  const wrap = document.createElement('label');
  wrap.className = 'field';
  const span = document.createElement('span');
  span.textContent = labelText;
  wrap.appendChild(span);
  wrap.appendChild(inputEl);
  parent.appendChild(wrap);
  return inputEl;
}

function textInput(value = '') {
  const el = document.createElement('input');
  el.type = 'text';
  el.value = value;
  return el;
}

function selectInput(options, value) {
  const el = document.createElement('select');
  for (const opt of options) {
    const o = document.createElement('option');
    o.value = typeof opt === 'string' ? opt : opt.value;
    o.textContent = typeof opt === 'string' ? opt : opt.label;
    el.appendChild(o);
  }
  el.value = value;
  return el;
}

function buttonRow(parent, buttons) {
  const row = document.createElement('div');
  row.className = 'modal-actions';
  for (const b of buttons) {
    const btn = document.createElement('button');
    btn.textContent = b.label;
    btn.className = b.primary ? 'btn btn-primary' : 'btn';
    btn.addEventListener('click', b.onClick);
    row.appendChild(btn);
  }
  parent.appendChild(row);
}

const BLOCK_TYPE_ORDER = ['declare', 'assign', 'input', 'output', 'if', 'while', 'dowhile', 'for', 'call', 'comment'];

export function openInsertMenu(list, index, program, onInsert) {
  openModal((dialog, close) => {
    const h = document.createElement('h3');
    h.textContent = t('insertBlock');
    dialog.appendChild(h);
    const grid = document.createElement('div');
    grid.className = 'type-grid';
    for (const type of BLOCK_TYPE_ORDER) {
      const btn = document.createElement('button');
      btn.className = `type-btn type-btn-${type}`;
      btn.textContent = t(`block${type[0].toUpperCase()}${type.slice(1)}`);
      btn.addEventListener('click', () => {
        const block = newBlock(type);
        list.splice(index, 0, block);
        close();
        onInsert(block);
      });
      grid.appendChild(btn);
    }
    dialog.appendChild(grid);
    buttonRow(dialog, [{ label: t('cancel'), onClick: close }]);
  });
}

export function openBlockEditor(block, program, onSave) {
  openModal((dialog, close) => {
    const h = document.createElement('h3');
    h.textContent = `${t('editBlock')} — ${t(`block${block.type[0].toUpperCase()}${block.type.slice(1)}`)}`;
    dialog.appendChild(h);
    const form = document.createElement('div');
    form.className = 'modal-form';
    dialog.appendChild(form);

    const getters = [];
    buildFieldsForBlock(block, form, program, getters);

    buttonRow(dialog, [
      { label: t('cancel'), onClick: close },
      {
        label: t('save'), primary: true, onClick: () => {
          for (const apply of getters) apply();
          close();
          onSave(block);
        },
      },
    ]);
  });
}

function buildFieldsForBlock(block, form, program, getters) {
  switch (block.type) {
    case 'declare': {
      const name = field(form, t('varName'), textInput(block.varName));
      const type = field(form, t('varType'), selectInput(VAR_TYPES, block.varType));
      const arrChk = document.createElement('input');
      arrChk.type = 'checkbox';
      arrChk.checked = !!block.isArray;
      field(form, t('labelIsArray'), arrChk);
      const sizeWrap = document.createElement('div');
      const sizeInput = textInput(block.arraySize || '10');
      field(sizeWrap, t('labelArraySize'), sizeInput);
      form.appendChild(sizeWrap);
      const syncSize = () => { sizeWrap.style.display = arrChk.checked ? '' : 'none'; };
      arrChk.addEventListener('change', syncSize);
      syncSize();
      getters.push(() => {
        block.varName = name.value.trim() || block.varName;
        block.varType = type.value;
        block.isArray = arrChk.checked;
        block.arraySize = sizeInput.value;
      });
      break;
    }
    case 'assign': {
      const name = field(form, t('varName'), textInput(block.varName));
      const expr = field(form, t('labelExpression'), textInput(block.expr));
      getters.push(() => { block.varName = name.value.trim() || block.varName; block.expr = expr.value; });
      break;
    }
    case 'input': {
      const name = field(form, t('varName'), textInput(block.varName));
      const prompt = field(form, t('labelPrompt'), textInput(block.prompt));
      getters.push(() => { block.varName = name.value.trim() || block.varName; block.prompt = prompt.value; });
      break;
    }
    case 'output': {
      const expr = field(form, t('labelExpression'), textInput(block.expr));
      const nl = document.createElement('input');
      nl.type = 'checkbox';
      nl.checked = block.newline;
      field(form, t('labelNewline'), nl);
      getters.push(() => { block.expr = expr.value; block.newline = nl.checked; });
      break;
    }
    case 'if':
    case 'while':
    case 'dowhile': {
      const cond = field(form, t('labelCondition'), textInput(block.cond));
      getters.push(() => { block.cond = cond.value; });
      break;
    }
    case 'for': {
      const name = field(form, t('varName'), textInput(block.varName));
      const start = field(form, t('labelStart'), textInput(block.start));
      const end = field(form, t('labelEnd'), textInput(block.end));
      const step = field(form, t('labelStepBy'), textInput(block.step));
      getters.push(() => {
        block.varName = name.value.trim() || block.varName;
        block.start = start.value; block.end = end.value; block.step = step.value;
      });
      break;
    }
    case 'comment': {
      const ta = document.createElement('textarea');
      ta.value = block.text;
      ta.rows = 4;
      field(form, t('labelText'), ta);
      getters.push(() => { block.text = ta.value; });
      break;
    }
    case 'call': {
      const callable = program.routines.filter((r) => r.kind !== 'main').map((r) => ({
        value: r.name, label: `${r.name} (${r.kind})`, params: r.params.map((p) => ({ name: p.name, byRef: !!p.byRef })),
      }));
      const current = callable.find((c) => c.value === block.routine) || callable[0];
      const sel = field(form, t('labelRoutineToCall'), selectInput(callable.map((c) => ({ value: c.value, label: c.label })), current ? current.value : ''));
      const argsWrap = document.createElement('div');
      argsWrap.className = 'args-wrap';
      form.appendChild(argsWrap);
      const argInputs = [];
      const renderArgs = () => {
        argsWrap.innerHTML = '';
        argInputs.length = 0;
        const c = callable.find((x) => x.value === sel.value);
        const params = c ? c.params : [];
        params.forEach((p, i) => {
          const labelText = p.byRef ? `${p.name} (${t('byRef')})` : p.name;
          const input = field(argsWrap, labelText, textInput(block.routine === (c && c.value) ? (block.args[i] || '') : ''));
          if (p.byRef) input.title = t('byRefArgHint');
          argInputs.push(input);
        });
        if (params.length === 0) {
          const none = document.createElement('div');
          none.className = 'hint';
          none.textContent = '—';
          argsWrap.appendChild(none);
        }
      };
      sel.addEventListener('change', renderArgs);
      renderArgs();
      getters.push(() => {
        block.routine = sel.value;
        block.args = argInputs.map((i) => i.value);
      });
      break;
    }
    default:
      break;
  }
}

export function openRoutineEditor(routine, program, { onSave, onDelete }) {
  const isNew = !routine;
  openModal((dialog, close) => {
    const h = document.createElement('h3');
    h.textContent = isNew ? t('addRoutine') : t('editRoutine');
    dialog.appendChild(h);
    const form = document.createElement('div');
    form.className = 'modal-form';
    dialog.appendChild(form);

    const name = field(form, t('routineName'), textInput(routine ? routine.name : ''));
    const kind = field(form, t('routineKind'), selectInput(
      [{ value: 'procedure', label: t('kindProcedure') }, { value: 'function', label: t('kindFunction') }],
      routine ? routine.kind : 'procedure',
    ));
    const retWrap = document.createElement('div');
    const returnType = selectInput(VAR_TYPES, routine && routine.returnType ? routine.returnType : 'Integer');
    field(retWrap, t('returnType'), returnType);
    form.appendChild(retWrap);
    const syncRetVisibility = () => { retWrap.style.display = kind.value === 'function' ? '' : 'none'; };
    kind.addEventListener('change', syncRetVisibility);
    syncRetVisibility();

    const paramsHeader = document.createElement('div');
    paramsHeader.className = 'params-header';
    const paramsLabel = document.createElement('span');
    paramsLabel.textContent = t('parameters');
    const addParamBtn = document.createElement('button');
    addParamBtn.className = 'btn btn-small';
    addParamBtn.textContent = t('addParameter');
    paramsHeader.append(paramsLabel, addParamBtn);
    form.appendChild(paramsHeader);

    const paramsList = document.createElement('div');
    paramsList.className = 'params-list';
    form.appendChild(paramsList);

    const params = routine ? routine.params.map((p) => ({ ...p })) : [];
    function renderParams() {
      paramsList.innerHTML = '';
      params.forEach((p, idx) => {
        const row = document.createElement('div');
        row.className = 'param-row';
        const nameInput = textInput(p.name);
        nameInput.addEventListener('input', () => { p.name = nameInput.value; });
        const typeSelect = selectInput(VAR_TYPES, p.type);
        typeSelect.addEventListener('change', () => { p.type = typeSelect.value; });
        const byRefLabel = document.createElement('label');
        byRefLabel.className = 'byref-label';
        const byRefChk = document.createElement('input');
        byRefChk.type = 'checkbox';
        byRefChk.checked = !!p.byRef;
        byRefChk.addEventListener('change', () => { p.byRef = byRefChk.checked; });
        byRefLabel.append(byRefChk, document.createTextNode(t('byRef')));
        const rm = document.createElement('button');
        rm.className = 'btn btn-small';
        rm.textContent = t('remove');
        rm.addEventListener('click', () => { params.splice(idx, 1); renderParams(); });
        row.append(nameInput, typeSelect, byRefLabel, rm);
        paramsList.appendChild(row);
      });
    }
    addParamBtn.addEventListener('click', () => { params.push({ name: `p${params.length + 1}`, type: 'Integer', byRef: false }); renderParams(); });
    renderParams();

    const errorMsg = document.createElement('div');
    errorMsg.className = 'form-error';
    form.appendChild(errorMsg);

    const buttons = [{ label: t('cancel'), onClick: close }];
    if (!isNew && onDelete) {
      buttons.push({
        label: t('delete'), onClick: () => {
          if (confirm(t('confirmDeleteRoutine'))) { close(); onDelete(routine); }
        },
      });
    }
    buttons.push({
      label: t('save'), primary: true, onClick: () => {
        const n = name.value.trim();
        if (!NAME_RE.test(n)) { errorMsg.textContent = t('invalidName'); return; }
        if (isNameTaken(program, n, routine)) { errorMsg.textContent = t('duplicateRoutineName'); return; }
        close();
        onSave({
          name: n,
          kind: kind.value,
          returnType: kind.value === 'function' ? returnType.value : null,
          params: params.filter((p) => NAME_RE.test(p.name)),
        }, routine);
      },
    });
    buttonRow(dialog, buttons);
  });
}
