const CACHE_NAME = "paku-pwa-v8";

const STATIC_CACHE = [
  "/",
  "/Menu",
  "/dashboard",

  "/static/css/styles.css",
  "/static/css/dash.css",
  "/static/css/login.css",

  "/static/images/logo.jpg"
];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of STATIC_CACHE) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            await cache.put(url, response);
          }
        } catch (e) {
          console.warn("No se pudo cachear:", url);
        }
      }
    })
  );

  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Solo manejar GET
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          // Cache dinámico solo si es válido
          if (
            response.ok &&
            request.url.startsWith(self.location.origin)
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) =>
              cache.put(request, clone)
            );
          }
          return response;
        })
        .catch(() => {
          // Fallback SOLO para navegación
          if (request.mode === "navigate") {
            if (request.url.includes("/dashboard")) {
              return caches.match("/dashboard");
            }
            return caches.match("/menu");
          }

          return new Response("", { status: 204 });
        });
    })
  );
});
