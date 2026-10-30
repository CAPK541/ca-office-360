/* CA Office 360 service worker — offline app shell. Practice data is never cached here. */
const V = 'ca360-1.4.0';
const SHELL = ['./', './index.html', './config.js', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
const LIBS = ["https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js", "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js", "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js", "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL).then(() => Promise.allSettled(LIBS.map((u) => fetch(u, { mode: 'cors' }).then((r) => r.ok && c.put(u, r))))))); self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const req = e.request; if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (/(^|\.)google(apis|usercontent)?\.com$|accounts\.google\.com|apis\.google\.com|gstatic\.com$/.test(u.hostname) && !/fonts\.(googleapis|gstatic)\.com/.test(u.hostname)) return; // Google sign-in & Drive: always network
  if (u.origin === location.origin) { // app files: network first so updates arrive, cache when offline
    e.respondWith(fetch(req).then((r) => { if (r.ok) { const cp = r.clone(); caches.open(V).then((c) => c.put(req, cp)); } return r; }).catch(() => caches.match(req).then((m) => m || caches.match('./index.html'))));
    return;
  }
  if (/cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com/.test(u.hostname)) { // libraries & fonts: cache first
    e.respondWith(caches.match(req).then((m) => m || fetch(req).then((r) => { if (r.ok || r.type === 'opaque') { const cp = r.clone(); caches.open(V).then((c) => c.put(req, cp)); } return r; })));
  }
});
