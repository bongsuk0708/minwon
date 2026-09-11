// 계근 전표 입력 - 서비스워커
// 네트워크 우선. 수정한 화면이 바로 반영되고, 오프라인일 때만 저장본을 씁니다.
const CACHE = 'gyegeun-v13';
const SHELL = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).catch(()=>{}));
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', e=>{
  const req = e.request;
  if(req.method !== 'GET') return;                       // 전송(PUT)은 건드리지 않음
  if(!req.url.startsWith(self.location.origin)) return;  // 서버 요청은 그대로 통과

  e.respondWith(
    fetch(req)
      .then(res=>{
        const copy = res.clone();
        caches.open(CACHE).then(c=>c.put(req, copy)).catch(()=>{});
        return res;
      })
      .catch(()=> caches.match(req).then(hit=> hit || caches.match('./index.html')))
  );
});
