// SVG flowchart renderer. Two-pass layout: measure() computes the size a
// block (and its nested branches/bodies) will need, draw() then places
// shapes top-down using those sizes. Container blocks (if/while/dowhile/
// for) recurse into their own nested body arrays.
import { t } from './i18n.js';

const NS = 'http://www.w3.org/2000/svg';
const BOX_W = 180;
const BOX_H = 46;
const TERM_H = 40;
const DIAMOND_H = 62;
const GAP = 34; // vertical space reserved for the insert (+) control
const BRANCH_GAP = 48;
const MERGE_PAD = 22;
const MERGE_H = 16;
// Generous on purpose: nested loops/branches route their loop-back and
// exit lines through lanes this wide on each side of their body, so a loop
// inside a branch inside another loop still gets a lane of its own instead
// of its lines crossing a sibling construct's lines.
const LOOP_INDENT = 46;
const EXIT_LANE = 46;
const EXIT_PAD = 22;
const CONNECT_GAP = 14;

function svg(tag, attrs = {}, parent = null) {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  if (parent) parent.appendChild(el);
  return el;
}

function text(parent, x, y, str, cls = '') {
  const el = svg('text', { x, y, class: `flow-text ${cls}`.trim(), 'text-anchor': 'middle' }, parent);
  el.textContent = str;
  return el;
}

function truncate(str, max = 26) {
  str = String(str ?? '');
  return str.length > max ? `${str.slice(0, max - 1)}…` : str;
}

// ---------- measure pass ----------
function measureList(list) {
  let w = BOX_W;
  let h = GAP; // leading insert slot
  for (const b of list) {
    const m = measureBlock(b);
    w = Math.max(w, m.w);
    h += m.h + GAP;
  }
  return { w, h };
}

function measureBlock(b) {
  switch (b.type) {
    case 'if': {
      const tM = measureList(b.trueBody);
      const fM = measureList(b.falseBody);
      return { w: tM.w + fM.w + BRANCH_GAP, h: DIAMOND_H + CONNECT_GAP + Math.max(tM.h, fM.h) + MERGE_PAD + MERGE_H };
    }
    case 'while':
    case 'for': {
      const bM = measureList(b.body);
      return { w: bM.w + LOOP_INDENT + EXIT_LANE, h: DIAMOND_H + CONNECT_GAP + bM.h + EXIT_PAD };
    }
    case 'dowhile': {
      const bM = measureList(b.body);
      return { w: bM.w + LOOP_INDENT, h: bM.h + CONNECT_GAP + DIAMOND_H + EXIT_PAD };
    }
    default:
      return { w: BOX_W, h: BOX_H };
  }
}

// ---------- shape drawing helpers ----------
// A plain top-to-bottom connector between siblings in a list is itself
// clickable — click opens the insert picker, right-click pastes whatever
// was last cut (Flowgorithm-style: no separate + marker needed). Structural
// connectors used elsewhere (branch/loop wiring) call this without
// list/index/cbs and stay purely decorative.
function drawArrow(parent, x1, y1, x2, y2, list, index, cbs) {
  svg('line', { x1, y1, x2, y2, class: 'flow-line', 'marker-end': 'url(#arrowhead)' }, parent);
  if (list && cbs) {
    const hit = svg('line', { x1, y1, x2, y2, class: 'flow-line-hit' }, parent);
    hit.addEventListener('click', (ev) => { ev.stopPropagation(); cbs.onInsert(list, index); });
    hit.addEventListener('contextmenu', (ev) => { ev.preventDefault(); ev.stopPropagation(); cbs.onPaste(list, index); });
    svg('title', {}, hit).textContent = t('insertBlock');
  }
}
// `marker`=false is for a path that immediately merges back onto the main
// trunk, which the caller (drawList) always draws its own fresh arrow out
// of right after — an arrowhead here too would be a second, redundant one
// sitting in the middle of what should read as one continuous line.
function drawPath(parent, d, marker = true) {
  const attrs = { d, class: 'flow-line', fill: 'none' };
  if (marker) attrs['marker-end'] = 'url(#arrowhead)';
  svg('path', attrs, parent);
}

function shapeLabel(type) {
  return {
    declare: t('blockDeclare'), assign: t('blockAssign'), input: t('blockInput'), output: t('blockOutput'),
    call: t('blockCall'), comment: t('blockComment'),
  }[type] || type;
}

function blockText(b) {
  switch (b.type) {
    case 'declare': return b.isArray ? `${b.varName}[${b.arraySize}]: ${b.varType}` : `${b.varName}: ${b.varType}`;
    case 'assign': return `${b.varName} ← ${b.expr}`;
    case 'input': return `${t('blockInput')} ${b.varName}`;
    case 'output': return `${t('blockOutput')} ${b.expr}`;
    case 'call': return `${b.routine}(${b.args.join(', ')})`;
    case 'comment': return b.text;
    default: return '';
  }
}

function simpleShape(group, block, cx, y, w, h, cbs, hitMap, list, idx) {
  let el;
  const cls = `shape shape-${block.type}`;
  switch (block.type) {
    case 'input':
    case 'output': {
      const skew = 14;
      const pts = `${cx - w / 2 + skew},${y} ${cx + w / 2},${y} ${cx + w / 2 - skew},${y + h} ${cx - w / 2},${y + h}`;
      el = svg('polygon', { points: pts, class: cls }, group);
      break;
    }
    case 'call': {
      el = svg('rect', { x: cx - w / 2, y, width: w, height: h, class: cls }, group);
      svg('line', { x1: cx - w / 2 + 8, y1: y, x2: cx - w / 2 + 8, y2: y + h, class: 'shape-innerline' }, group);
      svg('line', { x1: cx + w / 2 - 8, y1: y, x2: cx + w / 2 - 8, y2: y + h, class: 'shape-innerline' }, group);
      break;
    }
    case 'comment': {
      el = svg('rect', { x: cx - w / 2, y, width: w, height: h, class: cls, rx: 4 }, group);
      break;
    }
    default:
      el = svg('rect', { x: cx - w / 2, y, width: w, height: h, class: cls, rx: 3 }, group);
  }
  const label = text(group, cx, y + h / 2 + 4, truncate(blockText(block)));
  svg('title', {}, el).textContent = `${shapeLabel(block.type)}: ${blockText(block)}`;
  wireShapeEvents(el, label, block, cbs, hitMap, list, idx);
  return el;
}

function wireShapeEvents(el, label, block, cbs, hitMap, list, idx) {
  el.dataset.blockId = block.id;
  const onClick = (ev) => { ev.stopPropagation(); cbs.onEdit(block, list, idx); };
  const onCtx = (ev) => { ev.preventDefault(); ev.stopPropagation(); cbs.onCut(block, list, idx); };
  el.addEventListener('click', onClick);
  label.addEventListener('click', onClick);
  el.addEventListener('contextmenu', onCtx);
  label.addEventListener('contextmenu', onCtx);
  el.style.cursor = 'pointer';
  hitMap.set(block.id, el);
}

// If's decision diamond, matching Flowgorithm's own shape for it.
function diamondShape(group, cx, y, w, h, condText, block, cbs, hitMap, list, idx) {
  const pts = `${cx},${y} ${cx + w / 2},${y + h / 2} ${cx},${y + h} ${cx - w / 2},${y + h / 2}`;
  const el = svg('polygon', { points: pts, class: 'shape shape-decision' }, group);
  const label = text(group, cx, y + h / 2 + 4, truncate(condText, 22));
  svg('title', {}, el).textContent = condText;
  wireShapeEvents(el, label, block, cbs, hitMap, list, idx);
  return el;
}

// While/For/Do-While's loop header, matching Flowgorithm's own shape for
// loops — a flattened hexagon, visually distinct from If's diamond.
function hexagonShape(group, cx, y, w, h, labelText, block, cbs, hitMap, list, idx) {
  const notch = Math.min(w * 0.22, 26);
  const pts = `${cx - w / 2},${y + h / 2} ${cx - w / 2 + notch},${y} ${cx + w / 2 - notch},${y} `
    + `${cx + w / 2},${y + h / 2} ${cx + w / 2 - notch},${y + h} ${cx - w / 2 + notch},${y + h}`;
  const el = svg('polygon', { points: pts, class: 'shape shape-loop' }, group);
  const label = text(group, cx, y + h / 2 + 4, truncate(labelText, 24));
  svg('title', {}, el).textContent = labelText;
  wireShapeEvents(el, label, block, cbs, hitMap, list, idx);
  return el;
}

// draw() places `list` inside a column whose left edge is `x` and whose
// width is the value measureList() computed for it. Returns the y of the
// bottom connector point and the column's horizontal center.
function drawList(group, list, x, yTop, colW, cbs, hitMap) {
  let y = yTop;
  const cx = x + colW / 2;
  drawArrow(group, cx, y, cx, y + GAP, list, 0, cbs);
  y += GAP;
  list.forEach((block, idx) => {
    const m = measureBlock(block);
    const bottom = drawBlock(group, block, x, y, colW, cbs, hitMap, list, idx);
    y = bottom;
    drawArrow(group, cx, y, cx, y + GAP, list, idx + 1, cbs);
    y += GAP;
  });
  return { bottomY: y, centerX: cx };
}

function drawBlock(group, block, x, y, colW, cbs, hitMap, list, idx) {
  switch (block.type) {
    case 'if': {
      const tM = measureList(block.trueBody);
      const fM = measureList(block.falseBody);
      const totalW = tM.w + fM.w + BRANCH_GAP;
      // Center this block's own content on the trunk line the parent
      // column already draws its connectors through (x + colW/2), instead
      // of on its own local width — otherwise, whenever a sibling is wider
      // than this If/While/For/DoWhile, the shape drifts off the line the
      // incoming/outgoing arrows actually use, and the diagram looks broken.
      const cx = x + colW / 2;
      const lx = cx - totalW / 2;
      diamondShape(group, cx, y, Math.min(BOX_W, totalW), DIAMOND_H, `${t('blockIf')}: ${block.cond}`, block, cbs, hitMap, list, idx);
      const branchY = y + DIAMOND_H + CONNECT_GAP;
      const tipX = cx;
      const tipY = y + DIAMOND_H;
      drawArrow(group, tipX, tipY, lx + tM.w / 2, branchY);
      drawArrow(group, tipX, tipY, lx + tM.w + BRANCH_GAP + fM.w / 2, branchY);
      text(group, tipX - 26, tipY + 13, t('branchTrue'), 'branch-label');
      text(group, tipX + 26, tipY + 13, t('branchFalse'), 'branch-label');
      const tRes = drawList(group, block.trueBody, lx, branchY, tM.w, cbs, hitMap);
      const fRes = drawList(group, block.falseBody, lx + tM.w + BRANCH_GAP, branchY, fM.w, cbs, hitMap);
      const mergeY = Math.max(tRes.bottomY, fRes.bottomY) + MERGE_PAD;
      drawArrow(group, tRes.centerX, tRes.bottomY, tRes.centerX, mergeY);
      drawArrow(group, fRes.centerX, fRes.bottomY, fRes.centerX, mergeY);
      svg('line', { x1: tRes.centerX, y1: mergeY, x2: fRes.centerX, y2: mergeY, class: 'flow-line' }, group);
      // No arrowhead: drawList's own leading connector for whatever comes
      // after this If starts at exactly (cx, mergeY) and supplies the one
      // arrowhead that should be seen here, so the two read as one line.
      drawPath(group, `M ${cx} ${mergeY} L ${cx} ${mergeY + MERGE_H}`, false);
      return mergeY + MERGE_H;
    }
    case 'while':
    case 'for': {
      const bM = measureList(block.body);
      const shapeW = Math.min(BOX_W, bM.w);
      const cx = x + colW / 2;
      const bodyLeft = cx - bM.w / 2;
      const laneX = bodyLeft - LOOP_INDENT / 2;
      const exitLaneX = bodyLeft + bM.w + EXIT_LANE / 2;
      const shapeLeftX = cx - shapeW / 2;
      const shapeRightX = cx + shapeW / 2;
      const shapeMidY = y + DIAMOND_H / 2;
      const label = block.type === 'for'
        ? `${t('blockFor')} ${block.varName} = ${block.start}..${block.end} (${block.step})`
        : `${t('blockWhile')}: ${block.cond}`;
      hexagonShape(group, cx, y, shapeW, DIAMOND_H, label, block, cbs, hitMap, list, idx);
      const bodyY = y + DIAMOND_H + CONNECT_GAP;
      // Starts from the shape's own vertical middle (hidden under the
      // shape itself down to its bottom edge) so there's no gap regardless
      // of the shape's exact height/edge math.
      drawArrow(group, cx, shapeMidY, cx, bodyY);
      const res = drawList(group, block.body, bodyLeft, bodyY, bM.w, cbs, hitMap);
      // Loop-back: body bottom -> dedicated lane -> the shape's own left
      // vertex (kept — a genuine, non-redundant arrowhead: nothing else
      // points into the shape from that side).
      drawPath(group, `M ${res.centerX} ${res.bottomY} L ${res.centerX} ${res.bottomY + 10} L ${laneX} ${res.bottomY + 10} L ${laneX} ${shapeMidY} L ${shapeLeftX} ${shapeMidY}`);
      // Exit: shape's right vertex -> dedicated lane -> back onto the
      // trunk. No arrowhead (see drawPath's comment above).
      const exitBottom = res.bottomY + EXIT_PAD;
      drawPath(group, `M ${shapeRightX} ${shapeMidY} L ${exitLaneX} ${shapeMidY} L ${exitLaneX} ${exitBottom} L ${cx} ${exitBottom}`, false);
      return exitBottom;
    }
    case 'dowhile': {
      const bM = measureList(block.body);
      const shapeW = Math.min(BOX_W, bM.w);
      const cx = x + colW / 2;
      const bodyLeft = cx - bM.w / 2;
      const laneX = bodyLeft - LOOP_INDENT / 2;
      const bodyY = y;
      const res = drawList(group, block.body, bodyLeft, bodyY, bM.w, cbs, hitMap);
      const diaY = res.bottomY + CONNECT_GAP;
      const shapeMidY = diaY + DIAMOND_H / 2;
      const shapeLeftX = cx - shapeW / 2;
      hexagonShape(group, cx, diaY, shapeW, DIAMOND_H, `${t('blockDowhile')}: ${block.cond}`, block, cbs, hitMap, list, idx);
      drawArrow(group, cx, res.bottomY, cx, diaY);
      // Loop-back: shape's left vertex -> dedicated lane -> body's top
      // (kept — genuine arrowhead re-entering the body).
      drawPath(group, `M ${shapeLeftX} ${shapeMidY} L ${laneX} ${shapeMidY} L ${laneX} ${bodyY - CONNECT_GAP} L ${res.centerX} ${bodyY - CONNECT_GAP} L ${res.centerX} ${bodyY}`);
      // Exit: straight down from the shape's own middle (hidden under it,
      // so no gap) to the return point. No arrowhead — see drawPath's note.
      const exitBottom = diaY + DIAMOND_H + EXIT_PAD;
      drawPath(group, `M ${cx} ${shapeMidY} L ${cx} ${exitBottom}`, false);
      return exitBottom;
    }
    default: {
      const cx = x + colW / 2;
      simpleShape(group, block, cx, y, BOX_W, BOX_H, cbs, hitMap, list, idx);
      return y + BOX_H;
    }
  }
}

export function renderRoutine(svgRoot, routine, cbs) {
  svgRoot.innerHTML = '';
  const defs = svg('defs', {}, svgRoot);
  const marker = svg('marker', {
    id: 'arrowhead', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse',
  }, defs);
  svg('path', { d: 'M0,0 L10,5 L0,10 z', class: 'arrow-fill' }, marker);

  const hitMap = new Map();
  const bodyM = measureList(routine.body);
  const totalW = Math.max(bodyM.w, BOX_W) + 60;
  const startLabel = routine.kind === 'main' ? t('start') : `${routine.name}(${routine.params.map((p) => p.name).join(', ')})`;
  const endLabel = t('end');

  const group = svg('g', { transform: 'translate(30,20)' }, svgRoot);
  const colX = (totalW - 60 - bodyM.w) / 2;

  // Start terminal
  const startCx = colX + bodyM.w / 2;
  svg('rect', { x: startCx - BOX_W / 2, y: 0, width: BOX_W, height: TERM_H, rx: TERM_H / 2, class: 'shape shape-terminal' }, group);
  text(group, startCx, TERM_H / 2 + 4, startLabel);
  drawArrow(group, startCx, TERM_H, startCx, TERM_H + GAP * 0.6);

  const bodyRes = drawList(group, routine.body, colX, TERM_H + GAP * 0.6, bodyM.w, cbs, hitMap);

  // End terminal
  svg('rect', { x: bodyRes.centerX - BOX_W / 2, y: bodyRes.bottomY, width: BOX_W, height: TERM_H, rx: TERM_H / 2, class: 'shape shape-terminal' }, group);
  text(group, bodyRes.centerX, bodyRes.bottomY + TERM_H / 2 + 4, endLabel);

  // +20 mirrors the group's own translate(30,20) offset (so the End shape
  // gets the same margin below it that the Start shape gets above it);
  // the group's translate is *inside* this height, so leaving it out here
  // left zero room for the End shape's stroke and clipped its bottom edge.
  const totalH = bodyRes.bottomY + TERM_H + 20 + 20;
  svgRoot.setAttribute('viewBox', `0 0 ${totalW} ${totalH}`);
  svgRoot.setAttribute('width', totalW);
  svgRoot.setAttribute('height', totalH);

  svgRoot.addEventListener('click', () => cbs.onDeselect && cbs.onDeselect());

  return { hitMap };
}

export function highlightBlock(hitMap, blockId) {
  for (const el of hitMap.values()) el.classList.remove('active-block');
  if (blockId && hitMap.has(blockId)) {
    hitMap.get(blockId).classList.add('active-block');
  }
}
