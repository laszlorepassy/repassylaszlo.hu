/* Egyszerű órarend – csak időpontok + órarend neve
   - Nincsenek tantárgyak
   - Minden tanítási napra közös időpontok
   - Státusz kijelzés + értesítés minden óra kezdetén és végén
*/

// Alap (példa) idők 0..10. órára
const DEFAULT_STARTS = ["07:15", "08:00", "08:55", "09:50", "10:50", "11:45", "12:40", "13:50", "14:35", "15:20", "16:05"];
const DEFAULT_ENDS = ["07:55", "08:45", "09:40", "10:35", "11:35", "12:30", "13:25", "14:30", "15:15", "16:00", "16:45"];
const DEFAULT_DAYS = [1, 2, 3, 4, 5]; // hétfő–péntek (Date.getDay() szerint)

const DAYS = ['vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat'];
const DAY_SHORT = ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'];
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0]; // megjelenítés hétfőtől

// Ennél régebbi eseményről nem küldünk értesítést (pl. alvó gép felébredése után)
const NOTIFY_WINDOW_MS = 2 * 60 * 1000;

// DOM
const statusTop = document.getElementById('statusTop');
const errorMessage = document.getElementById('errorMessage');
const timesList = document.getElementById('timesList');
const daysList = document.getElementById('daysList');
const timetableInput = document.getElementById('timetableName');
const newTabBtn = document.getElementById('newTabBtn');
const notifyBtn = document.getElementById('notifyBtn');

let saveTimer = null;
let lastTickTime = new Date();

newTabBtn.addEventListener('click', () => { window.open(window.location.pathname, '_blank'); });

// ---------- Felépítés ----------

function buildTimes() {
  timesList.innerHTML = '';
  for (let i = 0; i < DEFAULT_STARTS.length; i++) {
    const row = document.createElement('div'); row.className = 'time-row';
    const label = document.createElement('label'); label.textContent = `${i}. óra`; label.htmlFor = `start-${i}`;
    const s = document.createElement('input'); s.type = 'time'; s.id = `start-${i}`; s.value = DEFAULT_STARTS[i];
    s.setAttribute('aria-label', `${i}. óra kezdete`);
    const e = document.createElement('input'); e.type = 'time'; e.value = DEFAULT_ENDS[i];
    e.setAttribute('aria-label', `${i}. óra vége`);
    const note = document.createElement('span'); note.className = 'small-note';
    row.append(label, s, ' – ', e, note);
    timesList.appendChild(row);
  }
}

function buildDays() {
  daysList.innerHTML = '';
  for (const day of DAY_ORDER) {
    const label = document.createElement('label'); label.title = DAYS[day];
    const cb = document.createElement('input'); cb.type = 'checkbox'; cb.value = day;
    cb.checked = DEFAULT_DAYS.includes(day);
    label.append(cb, DAY_SHORT[day]);
    daysList.appendChild(label);
  }
}

// ---------- Adatok ----------

const getRows = () => Array.from(timesList.querySelectorAll('.time-row'));
const timeInputs = row => row.querySelectorAll("input[type='time']");
const getStarts = () => getRows().map(r => timeInputs(r)[0].value);
const getEnds = () => getRows().map(r => timeInputs(r)[1].value);
const getDays = () => Array.from(daysList.querySelectorAll('input')).filter(cb => cb.checked).map(cb => Number(cb.value));

// Csak a teljesen kitöltött, kezdés < befejezés sorok számítanak, kezdés szerint rendezve
function getPeriods() {
  const s = getStarts(), e = getEnds();
  return s.map((start, index) => ({ index, start, end: e[index] }))
    .filter(p => p.start && p.end && p.start < p.end)
    .sort((a, b) => a.start.localeCompare(b.start));
}

function collectData() { return { timetable: timetableInput.value, starts: getStarts(), ends: getEnds(), days: getDays() }; }

function applyData(d) {
  timetableInput.value = typeof d.timetable === 'string' ? d.timetable : 'Új órarend';
  getRows().forEach((row, i) => {
    const t = timeInputs(row);
    // ?? és nem ||: a szándékosan törölt (üres) időpont maradjon üres
    t[0].value = d.starts?.[i] ?? DEFAULT_STARTS[i];
    t[1].value = d.ends?.[i] ?? DEFAULT_ENDS[i];
  });
  const days = Array.isArray(d.days) ? d.days : DEFAULT_DAYS;
  daysList.querySelectorAll('input').forEach(cb => { cb.checked = days.includes(Number(cb.value)); });
}

// Soronkénti ellenőrzés; a hibát a sor mellett és felül is jelzi
function validateTimes() {
  let ok = true;
  let prevEnd = null;
  getRows().forEach(row => {
    const [s, e] = timeInputs(row);
    const note = row.querySelector('.small-note');
    let msg = '', invalid = false;
    if (!s.value !== !e.value) {
      msg = 'hiányos, kimarad';
    } else if (s.value && e.value) {
      if (s.value >= e.value) { msg = 'a kezdés nem előzi meg a végét'; invalid = true; }
      else if (prevEnd && s.value < prevEnd) { msg = 'ütközik az előző órával'; invalid = true; }
      prevEnd = e.value;
    }
    note.textContent = msg;
    row.classList.toggle('invalid', invalid);
    if (invalid) ok = false;
  });
  errorMessage.textContent = ok ? '' : 'Hibás időrend: kezdés < befejezés és időben növekvő sorrend szükséges.';
  errorMessage.style.display = ok ? 'none' : 'block';
  return ok;
}

// ---------- Mentés / betöltés URL-be (hash) ----------

function saveToURL() {
  const z = LZString.compressToEncodedURIComponent(JSON.stringify(collectData()));
  // replaceState: ne keletkezzen minden mentésnél új előzmény-bejegyzés
  history.replaceState(null, '', '#' + z);
}

function loadFromURL() {
  if (location.hash.length <= 1) return;
  const raw = location.hash.substring(1);
  let json = LZString.decompressFromEncodedURIComponent(raw);
  if (!json) { try { json = decodeURIComponent(raw); } catch { } }
  try { if (json) applyData(JSON.parse(json)); } catch (e) { console.error('Hibás URL-adat', e); }
}

function scheduleSave() { clearTimeout(saveTimer); saveTimer = setTimeout(saveToURL, 1200); }

function onEdit() { validateTimes(); tick(); scheduleSave(); }
function setupAutoSave() { document.querySelectorAll('input').forEach(inp => inp.addEventListener('input', onEdit)); }

// ---------- Időkezelés ----------

// Adott nap HH:MM időpontja (helyi idő, óraátállítás-biztos)
function atTime(date, hm) { const [h, m] = hm.split(':').map(Number); return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m); }
function addDays(date, n) { return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n); }
const secondsBetween = (a, b) => Math.ceil((b - a) / 1000);

const pad = n => String(n).padStart(2, '0');
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

function computeStatus(now, periods, days) {
  if (!periods.length || !days.length) return null;
  if (days.includes(now.getDay())) {
    for (let k = 0; k < periods.length; k++) {
      const p = periods[k];
      const start = atTime(now, p.start), end = atTime(now, p.end);
      if (now < start) return { type: k === 0 ? 'before' : 'break', period: p.index, remain: secondsBetween(now, start) };
      if (now < end) return { type: 'class', period: p.index, remain: secondsBetween(now, end) };
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

// ---------- Értesítések ----------

function updateNotifyBtn() {
  if (!('Notification' in window)) { notifyBtn.hidden = true; return; }
  const perm = Notification.permission;
  notifyBtn.hidden = perm === 'granted';
  notifyBtn.disabled = perm === 'denied';
  notifyBtn.textContent = perm === 'denied' ? 'Értesítések letiltva' : 'Értesítések bekapcsolása';
}

// Engedélykérés csak kattintásra: Firefox és Safari letiltja a magától felugró kérést
notifyBtn.addEventListener('click', async () => {
  try { await Notification.requestPermission(); } catch { }
  updateNotifyBtn();
});

function notify(title, body) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  // Androidos Chrome-on a konstruktor kivételt dob
  try { new Notification(title, { body }); } catch (e) { console.warn('Értesítés nem küldhető', e); }
}

// Egy nap órakezdés/-vég eseményei időrendben
function dayEvents(date, periods, days) {
  if (!days.includes(date.getDay())) return [];
  const events = [];
  for (const p of periods) {
    events.push({ time: atTime(date, p.start), title: 'Óra kezdődik', body: `${p.index}. óra` });
    events.push({ time: atTime(date, p.end), title: 'Óra vége', body: `${p.index}. óra véget ért` });
  }
  return events.sort((a, b) => a.time - b.time);
}

// Minden (from, to] közé eső eseményről értesít – így az utolsó óra vége és a
// szünet nélkül következő órák is szólnak, betöltéskor viszont nem jön hamis értesítés
function notifyEvents(from, to, periods, days) {
  if (to - from > NOTIFY_WINDOW_MS) from = new Date(to - NOTIFY_WINDOW_MS);
  const dates = from.toDateString() === to.toDateString() ? [to] : [from, to];
  for (const date of dates) {
    for (const ev of dayEvents(date, periods, days)) {
      if (ev.time > from && ev.time <= to) notify(ev.title, ev.body);
    }
  }
}

// ---------- Kijelzés ----------

function tick() {
  const now = new Date();
  const name = timetableInput.value || 'Órarend';
  const periods = getPeriods(), days = getDays();

  notifyEvents(lastTickTime, now, periods, days);
  lastTickTime = now;

  const st = computeStatus(now, periods, days);
  let text, cls, title = name;
  if (!st) {
    text = periods.length ? 'Nincs kiválasztott tanítási nap.' : 'Nincs beállított óra.';
    cls = 'status-none';
  } else if (st.type === 'class') {
    text = `${st.period}. óra tart, ${formatRemain(st.remain)} van hátra.`;
    cls = 'status-class';
    title = formatClock(st.remain);
  } else if (st.type === 'break') {
    text = `Szünet van, ${formatRemain(st.remain)} múlva kezdődik ${article(st.period)} ${st.period}. óra.`;
    cls = 'status-break';
    title = 'Szünet!';
  } else if (st.type === 'before') {
    text = `Ma ${article(st.period)} ${st.period}. óra ${formatRemain(st.remain)} múlva kezdődik.`;
    cls = 'status-idle';
  } else {
    text = `Következő óra: ${st.dayName} ${st.period}. óra, ${formatRemain(st.remain)} múlva.`;
    cls = 'status-idle';
  }
  statusTop.textContent = text;
  statusTop.className = cls;
  document.title = title;
}

// Időzítő Web Workerben: a háttérben lévő fülön a böngésző a fő szál
// időzítőit akár percenkénti futásra fojtja, a workerét nem
function startTicker() {
  let fallback = false;
  const useInterval = () => { if (!fallback) { fallback = true; setInterval(tick, 1000); } };
  try {
    const src = 'setInterval(() => postMessage(0), 1000);';
    const worker = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
    worker.onmessage = tick;
    worker.onerror = () => { worker.terminate(); useInterval(); };
  } catch {
    useInterval();
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
}

(function init() {
  buildTimes();
  buildDays();
  loadFromURL();
  validateTimes();
  setupAutoSave();
  updateNotifyBtn();
  window.addEventListener('hashchange', () => { loadFromURL(); validateTimes(); tick(); });
  tick();
  startTicker();
})();
