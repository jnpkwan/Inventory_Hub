const CACHE_NAME = 'acacia-replen-v1';
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install — cache app shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_ASSETS))
  );
  self.skipWaiting();
});

// Activate — purge old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — shell from cache, API calls pass through (network-first for data)
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Google Apps Script API — always network, no caching
  if (url.hostname.includes('script.google.com')) {
    e.respondWith(fetch(e.request).catch(() =>
      new Response(JSON.stringify({ error: 'offline', message: 'No network connection. Data will sync when back online.' }), {
        headers: { 'Content-Type': 'application/json' }
      })
    ));
    return;
  }

  // App shell — cache first, network fallback
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
      if (resp && resp.status === 200 && e.request.method === 'GET') {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
      }
      return resp;
    }))
  );
});
