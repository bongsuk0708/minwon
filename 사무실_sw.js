// 잠실·삼전 수거관리 서비스워커
// 새 버전을 올리면 바로 반영되도록 '인터넷 우선' 방식으로 동작한다.
const CACHE = 'minwon-v77';

self.addEventListener('install', e => {
  self.skipWaiting();                       // 새 버전을 기다리지 않고 바로 적용
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();             // 열려 있는 화면에도 즉시 적용
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // 인터넷이 되면 항상 최신 파일을 받아오고, 안 되면 저장해 둔 것을 보여 준다.
  e.respondWith((async () => {
    try {
      const fresh = await fetch(req, { cache: 'no-store' });
      if (fresh && fresh.status === 200 && fresh.type === 'basic') {
        const c = await caches.open(CACHE);
        c.put(req, fresh.clone());
      }
      return fresh;
    } catch (err) {
      const hit = await caches.match(req);
      if (hit) return hit;
      throw err;
    }
  })());
});
