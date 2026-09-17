/* Órarend időzítő – DOM-független logika
   Böngészőben globális függvényekként érhető el, Node-ban (tesztek) module.exports-szal.
*/

// Alap (példa) idők 0..10. órára
const DEFAULT_STARTS = ["07:15", "08:00", "08:55", "09:50", "10:50", "11:45", "12:40", "13:50", "14:35", "15:20", "16:05"];
const DEFAULT_ENDS = ["07:55", "08:45", "09:40", "10:35", "11:35", "12:30", "13:25", "14:30", "15:15", "16:00", "16:45"];
const DEFAULT_DAYS = [1, 2, 3, 4, 5]; // hétfő–péntek (Date.getDay() szerint)
const DEFAULT_WARNINGS = [5, 1]; // figyelmeztetés ennyi perccel az óra vége előtt

const DAYS = ['vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat'];

// ---------- Időpontok ----------

const pad = n => String(n).padStart(2, '0');

// „7:15”, „07.15”, „715”, „7” → „07:15” / „07:00”; üres → ''; érvénytelen → null
function normalizeTime(str) {
  const t = String(str ?? '').trim();
  if (!t) return '';
  const m = t.match(/^(\d{1,2})(?:[:.]?(\d{2}))?$/);
  if (!m) return null;
  const h = Number(m[1]), min = Number(m[2] ?? 0);
  if (h > 23 || min > 59) return null;
  return `${pad(h)}:${pad(min)}`;
}

const toMinutes = hm => { const [h, m] = hm.split(':').map(Number); return h * 60 + m; };
const fromMinutes = min => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;

// Adott nap HH:MM időpontja (helyi idő, óraátállítás-biztos)
function atTime(date, hm) { const [h, m] = hm.split(':').map(Number); return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m); }
function addDays(date, n) { return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n); }
const secondsBetween = (a, b) => Math.ceil((b - a) / 1000);

function formatClock(sec) {
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  return h ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}
// Egy órán belül perc:mp, afölött „X óra Y perc”
function formatRemain(sec) {
  if (sec < 3600) return formatClock(sec);
  return `${Math.floor(sec / 3600)} óra ${Math.floor((sec % 3600) / 60)} perc`;
}
// Névelő a sorszám elé: „az 1. óra”, „az 5. óra”, de „a 2. óra”
const article = n => (n === 1 || n === 5) ? 'az' : 'a';

// „5, 1” → [5, 1]: 1–120 közötti egész percek, csökkenő sorrendben, ismétlés nélkül
function parseWarnings(str) {
  const nums = String(str ?? '').split(/[\s,;]+/).map(Number).filter(n => Number.isInteger(n) && n >= 1 && n <= 120);
  return [...new Set(nums)].sort((a, b) => b - a);
}

// ---------- Órarend ----------

// Csak a teljesen kitöltött, kezdés < befejezés sorok számítanak, kezdés szerint rendezve
function buildPeriods(starts, ends) {
  return starts.map((s, index) => ({ index, start: normalizeTime(s), end: normalizeTime(ends[index]) }))
    .filter(p => p.start && p.end && p.start < p.end)
    .sort((a, b) => a.start.localeCompare(b.start));
}

// Soronkénti ellenőrzés: [{ msg, invalid }]
function validateRows(starts, ends) {
  let prevEnd = null;
  return starts.map((s, i) => {
    const sv = normalizeTime(s), ev = normalizeTime(ends[i]);
    if (sv === null || ev === null) return { msg: 'érvénytelen időpont (óó:pp, pl. 07:15)', invalid: true };
    if (!sv !== !ev) return { msg: 'hiányos, kimarad', invalid: false };
    if (!sv) return { msg: '', invalid: false };
    let result = { msg: '', invalid: false };
    if (sv >= ev) result = { msg: 'a kezdés nem előzi meg a végét', invalid: true };
    else if (prevEnd && sv < prevEnd) result = { msg: 'ütközik az előző órával', invalid: true };
    prevEnd = ev;
    return result;
  });
}

// Új sor javasolt ideje: az utolsó óra után 10 perc szünet, 45 perces óra
function suggestNextRow(starts, ends) {
  const lastEnd = ends.map(normalizeTime).filter(Boolean).pop();
  const start = lastEnd ? Math.min(toMinutes(lastEnd) + 10, 23 * 60 + 14) : 8 * 60;
  return { start: fromMinutes(start), end: fromMinutes(Math.min(start + 45, 23 * 60 + 59)) };
}

// type: 'class' | 'break' | 'before' (ma még nem kezdődött) | 'future' (másik napon); null, ha nincs óra
// from/to: a jelenlegi óra vagy szünet határai (haladásjelzőhöz), ha értelmezhető
function computeStatus(now, periods, days) {
  if (!periods.length || !days.length) return null;
  if (days.includes(now.getDay())) {
    for (let k = 0; k < periods.length; k++) {
      const p = periods[k];
      const start = atTime(now, p.start), end = atTime(now, p.end);
      if (now < start) {
        if (k === 0) return { type: 'before', period: p.index, remain: secondsBetween(now, start) };
        return { type: 'break', period: p.index, remain: secondsBetween(now, start), from: atTime(now, periods[k - 1].end), to: start };
      }
      if (now < end) return { type: 'class', period: p.index, remain: secondsBetween(now, end), from: start, to: end };
    }
  }
  for (let off = 1; off <= 7; off++) {
    const day = addDays(now, off);
    if (!days.includes(day.getDay())) continue;
    const p = periods[0];
    return { type: 'future', period: p.index, remain: secondsBetween(now, atTime(day, p.start)), dayName: DAYS[day.getDay()] };
  }
  return null;
}

// Eltelt hányad (0..1) a jelenlegi órából vagy szünetből; null, ha nincs értelme
function progressOf(status, now) {
  if (!status?.from || !status?.to) return null;
  const total = status.to - status.from;
  return total > 0 ? Math.min(1, Math.max(0, (now - status.from) / total)) : null;
}

// ---------- Események (értesítés, hang) ----------

const KIND_ORDER = { warning: 0, end: 1, start: 2 };

// Egy nap eseményei időrendben; azonos időpontban előbb a figyelmeztetés, aztán a vége, végül a kezdés
function dayEvents(date, periods, days, warnings = []) {
  if (!days.includes(date.getDay())) return [];
  const events = [];
  for (const p of periods) {
    const start = atTime(date, p.start), end = atTime(date, p.end);
    events.push({ time: start, kind: 'start', period: p.index });
    events.push({ time: end, kind: 'end', period: p.index });
    for (const min of warnings) {
      const time = new Date(end.getTime() - min * 60000);
      if (time > start) events.push({ time, kind: 'warning', period: p.index, minutes: min });
    }
  }
  return events.sort((a, b) => (a.time - b.time) || (KIND_ORDER[a.kind] - KIND_ORDER[b.kind]));
}

// A (from, to] közé eső események; ha a rés túl nagy (pl. alvó gép), csak az utolsó maxGapMs-ot nézi
function eventsBetween(from, to, periods, days, warnings = [], maxGapMs = 2 * 60 * 1000) {
  if (to - from > maxGapMs) from = new Date(to - maxGapMs);
  const dates = from.toDateString() === to.toDateString() ? [to] : [from, to];
  return dates.flatMap(date => dayEvents(date, periods, days, warnings)).filter(ev => ev.time > from && ev.time <= to);
}

if (typeof module !== 'undefined') {
  module.exports = {
    DEFAULT_STARTS, DEFAULT_ENDS, DEFAULT_DAYS, DEFAULT_WARNINGS, DAYS,
    normalizeTime, atTime, addDays, formatClock, formatRemain, article, parseWarnings,
    buildPeriods, validateRows, suggestNextRow, computeStatus, progressOf, dayEvents, eventsBetween,
  };
}
