
const CACHE="biblia-sagrada-v06";
const ASSETS=["./","./index.html","./style.css","./app.js","./manifest.json","./icon.svg","./cover-biblia.png"];
self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});
self.addEventListener("fetch",event=>{
  event.respondWith(
    caches.match(event.request).then(cached=>
      cached || fetch(event.request).then(response=>{
        if(event.request.method==="GET" && response.ok){
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{});
        }
        return response;
      }).catch(()=>event.request.mode==="navigate"?caches.match("./index.html"):undefined)
    )
  );
});
