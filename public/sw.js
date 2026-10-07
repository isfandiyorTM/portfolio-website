// Bump when the caching rules change — every older cache is dropped on activate.
const CACHE = "im-dev-v2";
const SHELL = "/index.html";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.add(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Pages: network first, so a new deploy is visible on the very next visit.
  // The cached shell is only the offline fallback.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(SHELL, clone));
        }
        return res;
      }).catch(() => caches.match(SHELL))
    );
    return;
  }

  // Build assets carry a content hash in their name and never change.
  if (url.pathname.startsWith("/assets/")) {
    e.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(req, clone));
        }
        return res;
      }))
    );
  }

  // Everything else (APK downloads, images, the CV) goes straight to the network.
});
