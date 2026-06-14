const CACHE_NAME = "my-games-pwa-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./games.json",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./shared/common.css",
  "./shared/home.css",
  "./shared/home.js",
  "./shared/pwa.js",
  "./shared/audio.js",
  "./shared/storage.js",
  "./shared/resize.js",
  "./games/10sec/index.html",
  "./games/2048/index.html",
  "./games/HITandBLOW/index.html",
  "./games/Slide%20Block/index.html",
  "./games/flappy-oneclick/index.html",
  "./games/hex-minesweeper/index.html",
  "./games/lightout/index.html",
  "./games/samegame/index.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => cachedResponse || fetch(event.request).then(response => {
        const responseCopy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseCopy));
        return response;
      }))
      .catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("./index.html");
        }
        return Response.error();
      })
  );
});
