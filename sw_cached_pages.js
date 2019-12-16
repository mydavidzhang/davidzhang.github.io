const cacheName = 'v2';

const cacheAssets = [
    'index.html',
    'about.html',
    '/css/style.css',
    '/js/main.js'
];

// Call install event
self.addEventListener('install', e => {
    console.log('installed');

    e.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log('sw caching files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    console.log('activate');
    // Remove unwanted cache
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('sw clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

// Call fetch event
self.addEventListener('fetch', e => {
    console.log('sw fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
})