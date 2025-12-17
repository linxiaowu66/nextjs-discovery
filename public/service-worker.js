// 空的 Service Worker 文件
// 用于阻止浏览器的 404 错误

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.claim();
});

