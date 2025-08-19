
const CACHE_NAME = 'ai-python-v1';
const urlsToCache = [
    '/',
    '/premium-styles.css',
    '/interactive-python-editor.html',
    '/newsletter.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) return response;
                return fetch(event.request);
            }
        )
    );
});