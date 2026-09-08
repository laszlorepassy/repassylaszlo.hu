/* Egyszerű órarend – csak időpontok + órarend neve
   - Nincsenek tantárgyak
   - Minden napra közös időpontok
   - Státusz kijelzés + értesítés minden óra kezdetén és végén
*/

// Alap (példa) idők 0..10. órára
const DEFAULT_STARTS = ["07:15", "08:00", "08:55", "09:50", "10:50", "11:45", "12:40", "13:50", "14:35", "15:20", "16:05"];
const DEFAULT_ENDS = ["07:55", "08:45", "09:40", "10:35", "11:35", "12:30", "13:25", "14:30", "15:15", "16:00", "16:45"];

// DOM
const statusTop = document.getElementById('statusTop');
const errorMessage = document.getElementById('errorMessage');
const timesList = document.getElementById('timesList');
const timetableInput = document.getElementById('timetableName');
const newTabBtn = document.getElementById('newTabBtn');

let saveTimer = null; let lastStatusType = null; let lastPeriod = null;

// Engedélykérés értesítésekhez
(function () { if ('Notification' in window && Notification.permission === 'default') { Notification.requestPermission().catch(() => { }); } })();

newTabBtn.addEventListener('click', () => { window.open(window.location.pathname, '_blank'); });

// Segédfüggvények időinputokhoz
const getRows = () => Array.from(timesList.querySelectorAll('.time-row'));
const getStarts = () => getRows().map(r => r.querySelectorAll("input[type='time']")[0].value);
const getEnds = () => getRows().map(r => r.querySelectorAll("input[type='time']")[1].value);

// Táblázat helyett egyszerű idősor
function buildTimes() {
  timesList.innerHTML = '';
  for (let i = 0; i < DEFAULT_STARTS.length; i++) {
    const row = document.createElement('div'); row.className = 'time-row';
    const label = document.createElement('label'); label.textContent = `${i}. óra`;
    const s = document.createElement('input'); s.type = 'time'; s.value = DEFAULT_STARTS[i] || '';
    const e = document.createElement('input'); e.type = 'time'; e.value = DEFAULT_ENDS[i] || '';
    const note = document.createElement('span'); note.className = 'small-note'; note.textContent = '';
    row.appendChild(label); row.appendChild(s); row.appendChild(document.createTextNode(' – ')); row.appendChild(e); row.appendChild(note);
    timesList.appendChild(row);
  }
}

// Mentés / betöltés URL-be (hash)
function collectData() { return { timetable: timetableInput.value, starts: getStarts(), ends: getEnds() }; }
function applyData(d) { timetableInput.value = d.timetable || 'Új órarend'; const rows = getRows(); rows.forEach((row, i) => { const t = row.querySelectorAll("input[type='time']"); t[0].value = d.starts?.[i] || DEFAULT_STARTS[i] || ''; t[1].value = d.ends?.[i] || DEFAULT_ENDS[i] || ''; }); }
function validateTimes() { let ok = true; errorMessage.style.display = 'none'; const s = getStarts(), e = getEnds(); for (let i = 0; i < s.length; i++) { if (!s[i] || !e[i]) continue; if (s[i] >= e[i]) ok = false; if (i > 0 && s[i] < e[i - 1]) ok = false; } if (!ok) { errorMessage.textContent = 'Hibás időrend: kezdés < befejezés és időben növekvő sorrend szükséges.'; errorMessage.style.display = 'block'; } return ok; }
function saveToURL() { if (!validateTimes()) return; const json = JSON.stringify(collectData()); const z = LZString.compressToEncodedURIComponent(json); location.hash = z; }
function loadFromURL() { if (location.hash.length > 1) { const raw = location.hash.substring(1); let json = LZString.decompressFromEncodedURIComponent(raw); if (!json) { try { json = decodeURIComponent(raw); } catch { } } try { if (json) applyData(JSON.parse(json)); } catch (e) { console.error('Hibás URL-adat', e); } } }

function scheduleSave() { clearTimeout(saveTimer); saveTimer = setTimeout(() => { saveToURL(); }, 1200); }
function setupAutoSave() { document.querySelectorAll('input').forEach(inp => { inp.addEventListener('input', scheduleSave); }); }

// Időkezelés
function parseTimeHM(str, dayOff = 0) { if (!str) return null; const [h, m] = str.split(':').map(Number); if (isNaN(h) || isNaN(m)) return null; const d = new Date(); d.setSeconds(0, 0); d.setHours(h, m); d.setDate(d.getDate() + dayOff); return d; }
const mmss = sec => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
const DAYS = ['vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat'];

function currentStatus() {
  const now = new Date(); const day = now.getDay();
  const s = getStarts(); const e = getEnds();
  // Ma
  for (let i = 0; i < s.length; i++) {
    if (!s[i] || !e[i]) continue; // üres sorokat kihagyjuk
    const st = parseTimeHM(s[i]); const en = parseTimeHM(e[i]); if (!st || !en) continue;
    if (now >= st && now <= en) return { type: 'class', period: i, remain: Math.floor((en - now) / 1000) };
    if (now < st) return { type: 'break', period: i, remain: Math.floor((st - now) / 1000) };
  }
  // Következő napokban
  for (let off = 1; off <= 7; off++) {
    for (let i = 0; i < s.length; i++) {
      if (!s[i]) continue; const st = parseTimeHM(s[i], off); if (!st) continue;
      return { type: 'future', period: i, remain: Math.floor((st - now) / 1000), dayName: DAYS[(day + off) % 7] };
    }
  }
  return null;
}

function notify(title, body) { if ('Notification' in window && Notification.permission === 'granted') { new Notification(title, { body }); } }

function tick() {
  const name = timetableInput.value || 'Órarend';
  const st = currentStatus();
  if (!st) { statusTop.textContent = 'Nincs beállított óra.'; statusTop.style.background = '#fff6f6'; document.title = name; return; }
  if (st.type === 'class') {
    statusTop.textContent = `${st.period}. óra tart, ${mmss(st.remain)} van hátra.`;
    statusTop.style.background = '#fff6f6';
    document.title = mmss(st.remain);
    if (lastStatusType !== 'class' || lastPeriod !== st.period) { notify('Óra kezdődik', `${st.period}. óra`); }
  } else if (st.type === 'break') {
    statusTop.textContent = `Szünet van, ${mmss(st.remain)} múlva kezdődik a ${st.period}. óra.`;
    statusTop.style.background = '#e6ffe6';
    document.title = 'Szünet!';
    if (lastStatusType === 'class') { notify('Óra vége', `${lastPeriod}. óra véget ért`); }
  } else if (st.type === 'future') {
    statusTop.textContent = `Következő óra: ${st.dayName} ${st.period}. óra, ${Math.floor(st.remain / 3600)} óra ${Math.floor((st.remain % 3600) / 60)} perc múlva.`;
    statusTop.style.background = '#e6ffe6';
    document.title = name;
  }
  lastStatusType = st.type; lastPeriod = st.period;
}

(function init() {
  buildTimes();
  loadFromURL();
  setupAutoSave();
  tick();
  setInterval(tick, 1000);
})();
