const cache_name = "pocketstore-cache-v1";
const archivos = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./icons/icon-bag.png",
    "./icons/icon-carshop.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cache_name)
            .then(cache => {
                console.log("Archivos guardados en caché");
                return cache.addAll(archivos);
            })
    );

});

self.addEventListener("activate", event => {
    console.log("Service Worker activado");
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(respuestaCache => {
                if (respuestaCache) {
                    return respuestaCache;
                }
                return fetch(event.request)
                    .then(respuestaRed => {
                        const copia = respuestaRed.clone();
                        caches.open(cache_name)
                            .then(cache => {
                                cache.put(
                                    event.request,
                                    copia
                                );
                            });
                        return respuestaRed;
                    });
            })
    );
});