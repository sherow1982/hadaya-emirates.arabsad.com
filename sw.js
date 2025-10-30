// Service Worker for Hadaya Emirates
const CACHE_NAME = 'hadaya-emirates-v1.2';
const STATIC_ASSETS = [
  '/',
  '/style.css',
  '/products-data.js',
  '/cart.html',
  '/checkout.html'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: 'عروض جديدة متاحة الآن! 🎁',
    icon: '/manifest-icon-192.png',
    badge: '/manifest-icon-96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'explore', title: 'تصفح العروض', icon: '/icons/checkmark.png'},
      {action: 'close', title: 'إغلاق', icon: '/icons/xmark.png'}
    ]
  };

  event.waitUntil(
    self.registration.showNotification('هدايا الإمارات', options)
  );
});