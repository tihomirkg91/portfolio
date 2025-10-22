// Custom service worker to prevent automatic reloads
self.addEventListener('install', () => {
  console.log('Service worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', _event => {
  console.log('Service worker activating...');
  _event.waitUntil(self.clients.claim());
});

// Handle messages from the main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
