const CACHE_NAME = "paku-admin-v1";

const urlsToCache = [
  "/login",
  "/dashboard",
  "/static/css/login.css",
  "/static/css/dash.css",
  "/static/images/logo.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(
      cached => cached || fetch(event.request)
    )
  );
});
