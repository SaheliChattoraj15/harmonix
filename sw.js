/* ==========================================================================
   HARMONIX SOUND - SERVICE WORKER & OFFLINE CACHE
   Enables PWA installation, instant launch, and offline resilient audio playback
   ========================================================================== */

const CACHE_NAME = 'harmonix-sound-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/fonts.css',
  './css/variables.css',
  './css/base.css',
  './css/components.css',
  './css/player.css',
  './css/visualizer.css',
  './css/lyrics.css',
  './js/app.bundle.js',
  './assets/icon.svg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Pre-caching warning:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Skip caching non-GET requests or chrome-extension URLs
  if (req.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Audio files / Partial 206 range requests: direct network fetch to prevent audio decoding issues
  if (req.headers.has('range') || url.pathname.endsWith('.mp3') || url.pathname.endsWith('.ogg') || url.pathname.endsWith('.wav')) {
    event.respondWith(fetch(req));
    return;
  }

  // Cache-first strategy for static assets
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(req).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, responseToCache);
        });
        return networkResponse;
      });
    })
  );
});

