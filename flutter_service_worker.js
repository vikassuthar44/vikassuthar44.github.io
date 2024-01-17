'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "1a2a31f95cf8a765f4778a3c993f940b",
"splash/img/dark-1x.gif": "bfa66f663204e061514f97e97cc02cec",
"splash/img/light-1x.gif": "bfa66f663204e061514f97e97cc02cec",
"splash/img/light-2x.gif": "bc006c7e64b81203bd49d6ad2f20136d",
"splash/img/dark-4x.gif": "7c4a5f9ffa60250beb7b06c7253904c1",
"splash/img/light-3x.gif": "919741bdca125b43b64a95c21f6388e4",
"splash/img/dark-3x.gif": "919741bdca125b43b64a95c21f6388e4",
"splash/img/light-4x.gif": "7c4a5f9ffa60250beb7b06c7253904c1",
"splash/img/dark-2x.gif": "bc006c7e64b81203bd49d6ad2f20136d",
"index.html": "286ce893eecbf2afd24941f38da349ab",
"/": "286ce893eecbf2afd24941f38da349ab",
"main.dart.js": "cffdb5ada80430a2951720acb6f9c41f",
"flutter.js": "7d69e653079438abfbb24b82a655b0a4",
"favicon.png": "11517910b565bd961d556265983171eb",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "8822b58fff2b0c77e4d8301c16ae67f6",
"assets/AssetManifest.json": "797c90c9fff5234c407f0e6d2a5887ad",
"assets/NOTICES": "7ece91a82b203faafc70920614cf25ad",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "ec72dd9c12a4865561d283cc9b19bbb2",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/AssetManifest.bin": "ac2366e8fd238976500cc271bb2c31a9",
"assets/fonts/MaterialIcons-Regular.otf": "33a230b1de1d4ef74fee2d9f8191d066",
"assets/assets/icons/spring_boot.png": "7dd35ccb86fea18b32dbd1f6d2f09d8a",
"assets/assets/icons/profile_image.png": "309ebde726bd5b2dd164a7fbd217f88b",
"assets/assets/icons/kotlin_icon.png": "1dd7245f1f242c350ed68f14c3976309",
"assets/assets/icons/github.png": "2a25f1e91ef26345dbdd2526e3414349",
"assets/assets/icons/teaching.png": "2eb75797572d25a1b499deb9b1b7b8a2",
"assets/assets/icons/firebase.webp": "75c0ffb4713afdba1bb18b4344f3a9d3",
"assets/assets/icons/ic_linkedin.svg": "7a39f4f941210274fee75109ee9e0b6d",
"assets/assets/icons/java_icon.png": "0a66368175e41f1f697ddcf4226addb8",
"assets/assets/icons/medical_vidhyarthi.png": "041cf47288354f628c59ccbf817cc5af",
"assets/assets/icons/moodify_project.png": "2c9007c86dbac2a96658843b34d4fb44",
"assets/assets/icons/developer.png": "4342cc031c57d8751edaa1537c7c6f00",
"assets/assets/icons/flutter_icon.png": "22894680b8d109bfcc60c67eb2c21d6c",
"assets/assets/icons/mysql.png": "6ba0f75b2aebd8046927b2860eb38f3b",
"assets/assets/icons/android_image.png": "16d76bcc1b7c452ee1a0d10bd9f3c9a1",
"assets/assets/icons/ios.jpeg": "8e107e269446ed212ccedc61fca50e3f",
"assets/assets/icons/nodejs.png": "773ca761e56a8acea27195c21926de80",
"assets/assets/lottie/lo_hello.json": "6b8167e6c2a6aca309abbdaa8977bf7c",
"assets/assets/animations/splash_loading.gif": "7c4a5f9ffa60250beb7b06c7253904c1",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}