const cacheName = 'v2';

// Call install event
self.addEventListener('install', e => {
    console.log('installed');
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
    e.respondWith(
        fetch(e.request).then(res => {
            // Make copy/clone fo response
            const resClone = res.clone();
            // Open cache
            caches.open(cacheName).then(cache => {
                //Add response to cache
                cache.put(e.request, resClone);
            });
            return res;
        }).catch(err => caches.match(e.request).then(res => res))
    );
})