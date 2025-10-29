// Service Worker for Hadaya Emirates Store
// عامل الخدمة لمتجر هدايا الإمارات

const CACHE_NAME = 'hadaya-emirates-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/product.html',
  '/style.css',
  '/main.js',
  '/products-data.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('🚀 SW: تم فتح الذاكرة');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ SW: تم تخزين جميع الملفات');
        self.skipWaiting();
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ SW: مسح ذاكرة قديمة:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ SW: تم تفعيل عامل الخدمة');
      self.clients.claim();
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external domains (like WhatsApp)
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.includes('m5zoon.com') &&
      !event.request.url.includes('googleapis.com') &&
      !event.request.url.includes('cdnjs.cloudflare.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          console.log('💾 SW: تم تحميل من الذاكرة:', event.request.url.split('/').pop());
          return response;
        }

        return fetch(event.request).then(response => {
          // Don't cache if not ok
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
              console.log('💾 SW: تم حفظ في الذاكرة:', event.request.url.split('/').pop());
            });

          return response;
        }).catch(() => {
          // Return offline page for navigation requests
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Handle messages from main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('✨ SW: تم تحميل عامل الخدمة بنجاح');