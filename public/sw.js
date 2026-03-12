// PWA Service Worker - version injected by server
const VERSION = '__BUILD_ID__';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Optional: cache static assets (images, fonts) on first load
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;
  // Don't cache document or API - always get fresh HTML when we deploy
  if (url.pathname === '/' || url.pathname.startsWith('/admin') || url.pathname.startsWith('/api')) return;
  event.respondWith(fetch(event.request));
});
