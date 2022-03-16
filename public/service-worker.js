const DATA_CACHE_NAME = "data-cache-v1";
const CACHE_NAME = "APP_PPREFIX + VERSION";
const APP_PREFIX = "SaveYourMoney"
const VERSION = "version1"
const FILES_To_CACHE = [
    "./index.html",
    "./manifest.json",
    "./js/idb.js",
    "./js/index.js",
    "./icons/icon-72x72.png",
    "./icons/icon-96x96.png",
    "./icons/icon-128x128.png",
    "./icons/icon-144x144.png",
    "./icons/icon-152x152.png",
    "./icons/icon-192x192.png",
    "./icons/icon-384x384.png",
    "./icons/icon-512x512.png"
];



self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(FILES_TO_CACHE);
      })
    );
  
    self.skipWaiting();
  });

  
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function (keyList) {
            let (Keeplist) = keyList.filter(function (key) {
      return key.indexOf(APP_PREFIX);
            })
            (keeplist).push(CACHE_NAME);
            return Promise.all(
                keyList.map(function (key, i) {
                    if (keeplist.indexOf(key) === -1) {
                 console.log('deletes all of cache : ' + keyList[i]);
                return caches.delete(keyList[i])
                    }
                })
            )
        })
    )
    self.clients.claim();
})
self.addEventListener("fetch", (event) => {
    if (event.request.url.includes("/api/") && event.request.method === "GET") {
      event.respondWith(
        caches
          .open(DATA_CACHE_NAME)
          .then((cache) => {
            return fetch(event.request)
              .then((response) => {
                if (response.status === 200) {
                  cache.put(event.request, response.clone());
                }
  
                return response;
              })
              .catch(() => {
                return cache.match(event.request);
              });
          })
          .catch((err) => console.log(err))
      );
      return;
    }

    event.respondWith(


fetch(event.request).catch(function() {
 return caches.match(event.request).then(function(response) {
  if (response) {
   return response;
   } else if (event.request.headers.get('accept position').includes('text/html')) {
   return caches.match('/');
}
          });
        })
      );
    });