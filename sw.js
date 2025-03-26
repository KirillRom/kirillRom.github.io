
const CACHE_NAME = 'static-cache';
const DYNAMIC_CACHE_NAME = 'dynamic-cache';

const urlsToCache = [
'/',
  '/main.js',
  '/style.css',
  '/index.html',
  '/404.html',
];

self.addEventListener('install', async () => {
	try {
		const cache = await caches.open(CACHE_NAME);
		await cache.addAll(urlsToCache);
		console.log('Service Worker installed');
	} catch (error) {
		console.error('Failed to cache:', error);
	}
});

self.addEventListener('activate', async (event) => {
	console.log('Service Worker activated');
	// const cacheKeys = await caches.keys()
	// const cacheWhitelist = [CACHE_NAME, DYNAMIC_CACHE_NAME]; // Список кэшей, которые нужно оставить

    // await Promise.all(
    //     cacheKeys.map(cacheName => {
    //         if (!cacheWhitelist.includes(cacheName)) {
    //             return caches.delete(cacheName); // Удаляем кэш, если он не в whitelist
    //         }
    //     })
    // );

});

self.addEventListener('fetch', async (event) => {
    const url = new URL(event.request.url);
	console.log('Fetch event:');

    try {
        if (url.origin === location.origin) {
            event.respondWith(cacheFirst(event.request));
        } else if( url.protocol === 'chrome-extension:') {
			return
		} else {
            event.respondWith(networkFirst(event.request));
		}
    } catch (error) {
        // Можно вернуть кэшированное значение или сообщение об ошибке
        event.respondWith(new Response('Error fetching resource', { status: 500 }));
    }
});

const cacheFirst = async (request) => {
	const cached = await caches.match(request)
	return cached ?? await fetch(request)
}

const networkFirst = async (request) => {
	const cache = await caches.open(DYNAMIC_CACHE_NAME);
	console.log('networkFirst');
	try {
		const response = await fetch(request)
		await cache.put(request, response.clone())
		return response
	} catch (error) {
		const cached = await caches.match(request)
		return cached ?? null
	}
}