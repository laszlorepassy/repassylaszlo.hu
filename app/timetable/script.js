/* Órarend időzítő – felület
   - Főképernyő: státusz + haladásjelző, órák listája az aktuális kiemelésével
   - Beállítások ablak: név, tanítási napok, órák (sorok hozzáadása/törlése), jelzések, téma
   - Kivetítős mód: teljes képernyős nagy visszaszámláló
   - Értesítés és hang az óra kezdetén, végén és a vége előtti figyelmeztetéskor
   A számítások a logic.js-ben vannak (tesztelhető, DOM-független).
*/

// Domainzár: a publikált változatban a scripts/publish.py tölti ki az engedélyezett
// domainekkel; a forrásban null, hogy helyben (file://, localhost) is futtatható legyen
const ALLOWED_HOSTS = ["repassylaszlo.hu", "www.repassylaszlo.hu"];

const DAY_SHORT = ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'];
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0]; // megjelenítés hétfőtől
const DATA_KEY = 'timetable-data';
const PREFS_KEY = 'timetable-prefs';
const DEFAULT_NAME = 'Új órarend';

// DOM
const $ = id => document.getElementById(id);
const statusTop = $('statusTop');
const progress = $('progress'), progressFill = $('progressFill');
const errorMessage = $('errorMessage');
const appTitle = $('appTitle');
const scheduleList = $('scheduleList'), scheduleDays = $('scheduleDays');
const settingsDialog = $('settingsDialog');
const timetableInput = $('timetableName');
const daysList = $('daysList');
const timesList = $('timesList');
const warningsInput = $('warningsInput'), soundInput = $('soundInput');
const notifyBtn = $('notifyBtn'), notifyHint = $('notifyHint');
const projector = $('projector');

// Az órarend (URL-be és localStorage-ba mentve) és az eszközhöz kötött beállítások
let data = defaultData();
let prefs = loadPrefs();

let saveTimer = null;
let lastTickTime = new Date();

function defaultData() {
  return { timetable: DEFAULT_NAME, starts: [...DEFAULT_STARTS], ends: [...DEFAULT_ENDS], days: [...DEFAULT_DAYS] };
}

// ---------- Tárolás ----------

function storageGet(key) { try { return localStorage.getItem(key); } catch { return null; } }
function storageSet(key, value) { try { localStorage.setItem(key, value); } catch { } }

function loadPrefs() {
  const p = { theme: 'auto', warnings: [...DEFAULT_WARNINGS], sound: false };
  try {
    const saved = JSON.parse(storageGet(PREFS_KEY));
    if (['auto', 'light', 'dark'].includes(saved?.theme)) p.theme = saved.theme;
    if (Array.isArray(saved?.warnings)) p.warnings = parseWarnings(saved.warnings.join(','));
    if (typeof saved?.sound === 'boolean') p.sound = saved.sound;
  } catch { }
  return p;
}
function savePrefs() { storageSet(PREFS_KEY, JSON.stringify(prefs)); }

// Tömörített JSON → adat; hibás vagy hiányos mezőknél az alapértékek
function decodeData(raw) {
  if (!raw) return null;
  let json = LZString.decompressFromEncodedURIComponent(raw);
  if (!json) { try { json = decodeURIComponent(raw); } catch { } }
  try {
    const d = JSON.parse(json);
    const strings = a => Array.isArray(a) ? a.map(v => typeof v === 'string' ? v : '') : null;
    const starts = strings(d.starts), ends = strings(d.ends);
    const result = defaultData();
    if (typeof d.timetable === 'string') result.timetable = d.timetable;
    if (starts && ends) {
      const n = Math.max(starts.length, ends.length);
      result.starts = Array.from({ length: n }, (_, i) => starts[i] ?? '');
      result.ends = Array.from({ length: n }, (_, i) => ends[i] ?? '');
    }
    if (Array.isArray(d.days)) result.days = d.days.map(Number).filter(n => Number.isInteger(n) && n >= 0 && n <= 6);
    return result;
  } catch (e) {
    console.error('Hibás órarend-adat', e);
    return null;
  }
}
const encodeData = () => LZString.compressToEncodedURIComponent(JSON.stringify(data));

function save() {
  const z = encodeData();
  // replaceState: ne keletkezzen minden mentésnél új előzmény-bejegyzés
  history.replaceState(null, '', location.pathname + location.search + '#' + z);
  // A telepített app hash nélkül indul, ezért a legutóbbi órarend helyben is megmarad
  storageSet(DATA_KEY, z);
}
function scheduleSave() { clearTimeout(saveTimer); saveTimer = setTimeout(save, 800); }

// Betöltési sorrend: URL-hash → legutóbbi helyi órarend (kivéve „Új órarend” gombbal nyitott lapon) → alapértékek
function loadInitialData() {
  const params = new URLSearchParams(location.search);
  if (params.has('uj')) {
    params.delete('uj');
    const query = params.toString();
    history.replaceState(null, '', location.pathname + (query ? '?' + query : '') + location.hash);
    return decodeData(location.hash.substring(1)) ?? defaultData();
  }
  return decodeData(location.hash.substring(1)) ?? decodeData(storageGet(DATA_KEY)) ?? defaultData();
}

// ---------- Téma ----------

function applyTheme() {
  if (prefs.theme === 'auto') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = prefs.theme;
  const dark = prefs.theme === 'dark' || (prefs.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.querySelector('meta[name="theme-color"]').content = dark ? '#1c1c1f' : '#b5121b';
}

// ---------- Főképernyő ----------

const periodsNow = () => buildPeriods(data.starts, data.ends);

function renderSchedule() {
  appTitle.textContent = data.timetable || 'Órarend';
  const days = DAY_ORDER.filter(d => data.days.includes(d)).map(d => DAYS[d]);
  scheduleDays.textContent = days.length ? `Tanítási napok: ${days.join(', ')}` : 'Nincs kiválasztott tanítási nap.';
  scheduleList.replaceChildren(...periodsNow().map(p => {
    const li = document.createElement('li');
    li.dataset.period = p.index;
    const label = document.createElement('span'); label.className = 'period-label'; label.textContent = `${p.index}. óra`;
    const time = document.createElement('span'); time.className = 'period-time'; time.textContent = `${p.start} – ${p.end}`;
    li.append(label, time);
    return li;
  }));
  if (!scheduleList.children.length) {
    const li = document.createElement('li'); li.className = 'empty'; li.textContent = 'Nincs beállított óra. Add meg a Beállításokban.';
    scheduleList.append(li);
  }
}

function highlightSchedule(st) {
  for (const li of scheduleList.children) {
    const period = Number(li.dataset.period);
    const current = st?.type === 'class' && st.period === period;
    const next = !!st && st.type !== 'class' && st.period === period;
    li.classList.toggle('current', current);
    li.classList.toggle('next', next);
    if (current) li.setAttribute('aria-current', 'time'); else li.removeAttribute('aria-current');
  }
}

function setProgress(bar, fill, value) {
  bar.hidden = value === null;
  if (value !== null) fill.style.width = `${(value * 100).toFixed(2)}%`;
}

// ---------- Beállítások ablak ----------

function renderDays() {
  daysList.replaceChildren(...DAY_ORDER.map(day => {
    const label = document.createElement('label'); label.title = DAYS[day];
    const cb = document.createElement('input'); cb.type = 'checkbox'; cb.value = day;
    cb.checked = data.days.includes(day);
    cb.addEventListener('change', () => {
      data.days = [...daysList.querySelectorAll('input:checked')].map(c => Number(c.value));
      onDataChange({ rerenderRows: false });
    });
    label.append(cb, DAY_SHORT[day]);
    return label;
  }));
}

// Szöveges időmező: a natív <input type="time"> a böngésző nyelvi beállítása
// szerint AM/PM formátumot is mutathat, ez mindig 24 órás óó:pp
function createTimeInput(value, ariaLabel, onValue) {
  const inp = document.createElement('input');
  inp.type = 'text'; inp.className = 'time-input'; inp.value = value;
  inp.inputMode = 'numeric'; inp.maxLength = 5; inp.placeholder = 'óó:pp'; inp.autocomplete = 'off';
  inp.setAttribute('aria-label', `${ariaLabel} (óó:pp)`);
  // Gépelés közben csak a már teljes időpont számít, hogy ne villogjon a hibaüzenet
  inp.addEventListener('input', () => {
    if (/^\d{2}:\d{2}$/.test(inp.value)) { onValue(inp.value); onDataChange({ rerenderRows: false }); }
  });
  // Kilépéskor egységes formára hozzuk (pl. 715 → 07:15), és ellenőrzünk
  inp.addEventListener('change', () => {
    const t = normalizeTime(inp.value);
    if (t !== null) inp.value = t;
    onValue(inp.value);
    onDataChange({ rerenderRows: false });
  });
  return inp;
}

function renderRows() {
  timesList.replaceChildren(...data.starts.map((start, i) => {
    const row = document.createElement('div'); row.className = 'time-row';
    const label = document.createElement('label'); label.textContent = `${i}. óra`; label.htmlFor = `start-${i}`;
    const s = createTimeInput(start, `${i}. óra kezdete`, v => { data.starts[i] = v; }); s.id = `start-${i}`;
    const e = createTimeInput(data.ends[i], `${i}. óra vége`, v => { data.ends[i] = v; });
    const del = document.createElement('button');
    del.type = 'button'; del.className = 'icon-btn row-delete'; del.textContent = '×';
    del.setAttribute('aria-label', `${i}. óra törlése`);
    del.addEventListener('click', () => {
      data.starts.splice(i, 1); data.ends.splice(i, 1);
      onDataChange();
      // A fókusz ne vesszen el a törölt gombbal
      (timesList.querySelectorAll('.row-delete')[Math.min(i, data.starts.length - 1)] ?? $('addRowBtn')).focus();
    });
    const note = document.createElement('span'); note.className = 'small-note';
    row.append(label, s, '–', e, del, note);
    return row;
  }));
  showValidation();
}

// Soronkénti hibák a sorok alatt, összesítve felül; true, ha nincs hiba
function showValidation() {
  const results = validateRows(data.starts, data.ends);
  timesList.querySelectorAll('.time-row').forEach((row, i) => {
    row.querySelector('.small-note').textContent = results[i].msg;
    row.classList.toggle('invalid', results[i].invalid);
  });
  const ok = results.every(r => !r.invalid);
  errorMessage.textContent = ok ? '' : 'Hibás időrend: kezdés < befejezés és időben növekvő sorrend szükséges (Beállítások).';
  errorMessage.style.display = ok ? 'none' : 'block';
  return ok;
}

function renderSettings() {
  timetableInput.value = data.timetable;
  renderDays();
  renderRows();
  warningsInput.value = prefs.warnings.join(', ');
  soundInput.checked = prefs.sound;
  document.querySelectorAll('input[name="theme"]').forEach(r => { r.checked = r.value === prefs.theme; });
  updateNotifyBtn();
}

function onDataChange({ rerenderRows = true } = {}) {
  if (rerenderRows) renderRows(); else showValidation();
  renderSchedule();
  tick();
  scheduleSave();
}

function setupSettings() {
  $('settingsBtn').addEventListener('click', () => { renderSettings(); settingsDialog.showModal(); });
  // Háttérre kattintva is bezárul
  settingsDialog.addEventListener('click', e => { if (e.target === settingsDialog) settingsDialog.close(); });

  timetableInput.addEventListener('input', () => { data.timetable = timetableInput.value; onDataChange({ rerenderRows: false }); });

  $('addRowBtn').addEventListener('click', () => {
    const { start, end } = suggestNextRow(data.starts, data.ends);
    data.starts.push(start); data.ends.push(end);
    onDataChange();
    timesList.querySelector('.time-row:last-child .time-input')?.focus();
  });

  $('resetBtn').addEventListener('click', () => {
    if (!confirm('Visszaállítod az órák időpontjait és a tanítási napokat az alapértékekre? A név megmarad.')) return;
    const d = defaultData();
    data.starts = d.starts; data.ends = d.ends; data.days = d.days;
    renderDays();
    onDataChange();
  });

  warningsInput.addEventListener('change', () => {
    prefs.warnings = parseWarnings(warningsInput.value);
    warningsInput.value = prefs.warnings.join(', ');
    savePrefs();
  });
  soundInput.addEventListener('change', () => { prefs.sound = soundInput.checked; savePrefs(); if (prefs.sound) playSound('start'); });
  $('testSoundBtn').addEventListener('click', () => playSound('warning'));

  document.querySelectorAll('input[name="theme"]').forEach(r => r.addEventListener('change', () => {
    prefs.theme = r.value; savePrefs(); applyTheme();
  }));
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', applyTheme);
}

// ---------- Értesítések és hang ----------

function updateNotifyBtn() {
  if (!('Notification' in window)) {
    notifyBtn.hidden = true;
    notifyHint.textContent = 'Ez a böngésző nem támogatja az értesítéseket.';
    return;
  }
  const perm = Notification.permission;
  notifyBtn.hidden = perm !== 'default';
  notifyHint.textContent = perm === 'granted' ? 'Az értesítések be vannak kapcsolva. Csak akkor jönnek, ha az oldal nyitva van (akár háttérben).'
    : perm === 'denied' ? 'Az értesítések le vannak tiltva; a böngésző webhely-beállításaiban engedélyezheted.'
    : 'Értesítés csak akkor jön, ha az oldal nyitva van (akár háttérben).';
}

// Engedélykérés csak kattintásra: Firefox és Safari letiltja a magától felugró kérést
notifyBtn.addEventListener('click', async () => {
  try { await Notification.requestPermission(); } catch { }
  updateNotifyBtn();
});

async function notify(title, body) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const options = { body, icon: 'icon-192.png', tag: 'timetable', renotify: true };
  // Service Workeren keresztül Androidon és telepített appban is működik
  try {
    const reg = await navigator.serviceWorker?.getRegistration();
    if (reg) { await reg.showNotification(title, options); return; }
  } catch { }
  try { new Notification(title, options); } catch (e) { console.warn('Értesítés nem küldhető', e); }
}

// A böngészők csak felhasználói interakció után engedik a hanglejátszást
let audioCtx = null;
function unlockAudio() {
  try {
    audioCtx ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch { }
}
document.addEventListener('pointerdown', unlockAudio);
document.addEventListener('keydown', unlockAudio);

// [frekvencia (Hz), kezdés (mp)]
const TONES = {
  start: [[660, 0], [880, 0.18]],
  end: [[880, 0], [660, 0.18], [440, 0.36]],
  warning: [[988, 0], [988, 0.25]],
};
function playSound(kind) {
  unlockAudio();
  if (!audioCtx) return;
  const t0 = audioCtx.currentTime + 0.02;
  for (const [freq, offset] of TONES[kind]) {
    const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
    osc.type = 'sine'; osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t0 + offset);
    gain.gain.exponentialRampToValueAtTime(0.3, t0 + offset + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + offset + 0.16);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t0 + offset); osc.stop(t0 + offset + 0.18);
  }
}

function eventMessage(ev) {
  if (ev.kind === 'start') return ['Óra kezdődik', `${ev.period}. óra`];
  if (ev.kind === 'end') return ['Óra vége', `${ev.period}. óra véget ért`];
  return [`${ev.minutes} perc az óra végéig`, `${ev.period}. óra`];
}

function handleEvents(from, to, periods) {
  const events = eventsBetween(from, to, periods, data.days, prefs.warnings);
  for (const ev of events) notify(...eventMessage(ev));
  // Egyszerre csak egy hang szóljon (pl. óra vége + következő kezdete ugyanakkor)
  if (prefs.sound && events.length) playSound(events[events.length - 1].kind);
}

// ---------- Kijelzés ----------

function statusText(st) {
  if (!st) return !data.days.length ? 'Nincs kiválasztott tanítási nap.' : 'Nincs beállított óra.';
  if (st.type === 'class') return `${st.period}. óra tart, ${formatRemain(st.remain)} van hátra.`;
  if (st.type === 'break') return `Szünet van, ${formatRemain(st.remain)} múlva kezdődik ${article(st.period)} ${st.period}. óra.`;
  if (st.type === 'before') return `Ma ${article(st.period)} ${st.period}. óra ${formatRemain(st.remain)} múlva kezdődik.`;
  return `Következő óra: ${st.dayName} ${st.period}. óra, ${formatRemain(st.remain)} múlva.`;
}

function tick() {
  const now = new Date();
  const periods = periodsNow();

  handleEvents(lastTickTime, now, periods);
  lastTickTime = now;

  const st = computeStatus(now, periods, data.days);
  const value = progressOf(st, now);
  statusTop.textContent = statusText(st);
  statusTop.className = !st ? 'status-none' : st.type === 'class' ? 'status-class' : st.type === 'break' ? 'status-break' : 'status-idle';
  setProgress(progress, progressFill, value);
  highlightSchedule(st);
  document.title = st?.type === 'class' ? formatClock(st.remain) : st?.type === 'break' ? 'Szünet!' : (data.timetable || 'Órarend');

  if (!projector.hidden) renderProjector(st, now, value);
}

// ---------- Kivetítős mód ----------

let wakeLock = null;
async function requestWakeLock() {
  // A képernyő ne kapcsoljon ki kivetítés közben
  try { wakeLock = await navigator.wakeLock?.request('screen'); } catch { }
}

function renderProjector(st, now, value) {
  $('projectorName').textContent = data.timetable || 'Órarend';
  $('projectorClock').textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  let label, countdown;
  if (!st) { label = statusText(st); countdown = ''; }
  else if (st.type === 'class') { label = `${st.period}. óra`; countdown = formatClock(st.remain); }
  else if (st.type === 'break') { label = `Szünet – következik: ${st.period}. óra`; countdown = formatClock(st.remain); }
  else if (st.type === 'before') { label = `${st.period}. óra kezdetéig`; countdown = formatClock(st.remain); }
  else { label = `Következő óra: ${st.dayName} ${st.period}. óra`; countdown = formatRemain(st.remain); }
  $('projectorLabel').textContent = label;
  const cd = $('projectorCountdown');
  cd.textContent = countdown;
  cd.classList.toggle('long', countdown.length > 8);
  projector.className = st ? `projector-${st.type}` : '';
  setProgress($('projectorProgress'), $('projectorProgressFill'), value);
}

function openProjector() {
  projector.hidden = false;
  projector.requestFullscreen?.().catch(() => { });
  requestWakeLock();
  tick();
  $('projectorClose').focus();
}

function closeProjector() {
  projector.hidden = true;
  if (document.fullscreenElement) document.exitFullscreen().catch(() => { });
  wakeLock?.release().catch(() => { });
  wakeLock = null;
  $('projectorBtn').focus();
}

function setupProjector() {
  $('projectorBtn').addEventListener('click', openProjector);
  $('projectorClose').addEventListener('click', closeProjector);
  projector.addEventListener('dblclick', closeProjector);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !projector.hidden) closeProjector(); });
  // Ha a böngészővel lépnek ki a teljes képernyőből, a kivetítés is bezárul
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && !projector.hidden) closeProjector(); });
  // A képernyőzárat a böngésző elengedi, ha a lap háttérbe kerül
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !projector.hidden) requestWakeLock(); });
}

// ---------- Időzítő ----------

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

// ---------- PWA ----------

function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || !location.protocol.startsWith('http')) return;
  navigator.serviceWorker.register('sw.js').catch(e => console.warn('Service Worker nem regisztrálható', e));
}

// ---------- Domainzár ----------

// Letöltött vagy más oldalba ágyazott másolatban nem engedi a használatot
function isAllowedHost() {
  if (!ALLOWED_HOSTS) return true;
  if (!ALLOWED_HOSTS.includes(location.hostname)) return false;
  try {
    if (window.top !== window.self && !ALLOWED_HOSTS.includes(window.top.location.hostname)) return false;
  } catch {
    return false; // idegen domainről beágyazva
  }
  return true;
}

function blockUsage() {
  const url = `https://${ALLOWED_HOSTS[0]}/app/timetable/`;
  const box = document.createElement('div'); box.id = 'statusTop'; box.className = 'status-none';
  const link = document.createElement('a'); link.href = url; link.target = '_top'; link.textContent = url;
  box.append('Ez az alkalmazás csak itt használható: ', link);
  document.body.replaceChildren(box);
  document.title = 'Órarend időzítő';
}

(function init() {
  applyTheme();
  if (!isAllowedHost()) { blockUsage(); return; }
  data = loadInitialData();
  $('newTabBtn').addEventListener('click', () => { window.open(location.pathname + '?uj', '_blank'); });
  setupSettings();
  setupProjector();
  renderSchedule();
  showValidation();
  save();
  window.addEventListener('hashchange', () => {
    const d = decodeData(location.hash.substring(1));
    if (!d) return;
    data = d;
    if (settingsDialog.open) renderSettings();
    onDataChange({ rerenderRows: false });
  });
  tick();
  startTicker();
  registerServiceWorker();
})();
