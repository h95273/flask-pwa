// キャッシュしたいファイル名の指定
var CACHE_NAME = 'flask-pwa-test-caches';
var urlsToCache = [
    '/',
    '/static/css/new.css',
    '/static/css/page.css',
    '/static/img/512.png',
    '/static/js/app.js'
];

//install イベントでは、指定したファイルパスをすべててキャッシュ
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

//fetch イベントでは、ブラウザでキャッシュしたファイルを呼び出し
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            return response ? response : fetch(event.request);
        })
    );
});

//activate イベントによって直ちにService Workerがブラウザ上のリソースを操作できるようにする
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
})

