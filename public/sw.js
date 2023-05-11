const OFFLINE_VERSION = 1
const CACHE_NAME = 'offline'
const OFFLINE_URL = 'offline.html'

self.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_NAME)
			// Setting {cache: 'reload'} in the new request ensures that the
			// response isn't fulfilled from the HTTP cache; i.e., it will be
			// from the network.
			await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }))
		})()
	)
	// Force the waiting service worker to become the active service worker.
	self.skipWaiting()
})

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key === CACHE_NAME) {
						return
					}
					return caches.delete(key)
				})
			)
		})
	)

	// Tell the active service worker to take control of the page immediately.
	self.clients.claim()
})

self.addEventListener('fetch', (event) => {
	if (event.request.mode === 'navigate' && !navigator.onLine) {
		return event.respondWith(
			caches.open(CACHE_NAME).then((cache) => cache.match(OFFLINE_URL))
		)
	}
})
