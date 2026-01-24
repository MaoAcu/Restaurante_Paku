const CACHE_NAME = "paku-pwa-v10";


const SAFE_CACHE = [
  "/static/css/loginstyle.css",
  "/static/css/styles.css",,
  "/static/images/logo.jpg"
];

self.addEventListener("install", (event) => {
  console.log("[SW] Install");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        SAFE_CACHE.map((url) =>
          fetch(url)
            .then((res) => {
              if (!res.ok) {
                console.warn("[SW] No cache:", url);
                return null;
              }
              return cache.put(url, res.clone());
            })
            .catch(() => console.warn("[SW] Error cache:", url))
        )
      );
    })
  );

  self.skipWaiting();
});


self.addEventListener("activate", (event) => {
  console.log("[SW] Activate");

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


self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (
    request.method !== "GET" ||
    url.pathname.startsWith("/login") ||
    url.pathname.startsWith("/dashboard") ||
    url.pathname.startsWith("/logout") ||
    url.pathname.startsWith("/auth")
  ) {
    return;
  }

 
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
    
          if (
            response.ok &&
            request.destination !== "document"
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) =>
              cache.put(request, clone)
            );
          }
          return response;
        })
        .catch(() => {
          
          return new Response("", { status: 204 });
        });
    })
  );
});
