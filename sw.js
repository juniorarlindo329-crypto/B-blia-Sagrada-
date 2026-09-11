const CACHE="biblia-sagrada-v21";
const ASSETS=[
  "./",
  "./index.html",
  "./style.css?v=2.1",
  "./app.js?v=2.1",
  "./manifest.json",
  "./icon.svg",
  "./cover-biblia.png",
  "./audio/paz-na-palavra.mp3",
  "./audio/momento-de-oracao.mp3",
  "./audio/descanso-em-deus.mp3",
  "./audio/manha-com-a-palavra.mp3",
  "./audio/adoracao-suave.mp3",
  "./audio/noite-de-reflexao.mp3",
  "./audio/corinho-de-alegria.mp3",
  "./audio/fogo-e-fe.mp3"
];

self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c=>c.addAll(ASSETS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;

  const url=new URL(e.request.url);
  const sameOrigin=url.origin===self.location.origin;

  if(sameOrigin){
    e.respondWith(
      fetch(e.request,{cache:"no-store"})
        .then(res=>{
          const copy=res.clone();
          caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
          return res;
        })
        .catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html")))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
      const copy=res.clone();
      caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
      return res;
    }))
  );
});
