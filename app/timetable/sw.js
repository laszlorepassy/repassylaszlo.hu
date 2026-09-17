/* Órarend időzítő – Service Worker
   - Offline működés: hálózat először, ha nincs net, a gyorsítótárból
   - Értesítésre kattintva az app ablakát hozza előre
*/

const CACHE = 'timetable-0e3b32b';
const ASSETS = [
  './', 'index.html', 'script.js', 'logic.js', 'style.css', 'lz-string.min.js',
  'manifest.webmanifest', 'icon-192.png', 'table-icon-6369326-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Hálózat először, hogy frissítés után mindig az új változat jöjjön; offline a mentett példány.
// A ?v= verziójelölés nélkül tároljuk, így nem gyűlnek a régi változatok.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const key = new URL(req.url);
    key.search = '';
    try {
      const res = await fetch(req);
      if (res.ok) await cache.put(key.href, res.clone());
      return res;
    } catch (e) {
      const cached = await cache.match(key.href) ?? (req.mode === 'navigate' ? await cache.match('./') : undefined);
      if (cached) return cached;
      throw e;
    }
  })());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (windows.length) return windows[0].focus();
    return self.clients.openWindow('./');
  })());
});
