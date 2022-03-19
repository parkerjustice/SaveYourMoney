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

console.log("check files");
const CACHE_NAME = "data-cache-v1";
self.addEventListener("install", event => {
    event.waitUntil(
  
  caches.open(CACHE_NAME).then(cache => {
  return cache.addAll(FILES_TO_CACHE);
      })
    )
  .then(cache => cache.addAll(FILES_To_CACHE))
    self.skipWaiting();
  });
// cant get to work
//self.addEventListener("activate", event => {
  //event.waitUntil(caches
    //.keys().then(  =>
      //CACHE_NAME.filter(key) {

      //}))
  //)
//})