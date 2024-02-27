'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "1a2a31f95cf8a765f4778a3c993f940b",
"splash/img/dark-1x.gif": "d41d8cd98f00b204e9800998ecf8427e",
"splash/img/light-1x.gif": "d41d8cd98f00b204e9800998ecf8427e",
"splash/img/light-2x.gif": "d41d8cd98f00b204e9800998ecf8427e",
"splash/img/dark-4x.gif": "d41d8cd98f00b204e9800998ecf8427e",
"splash/img/light-3x.gif": "d41d8cd98f00b204e9800998ecf8427e",
"splash/img/dark-3x.gif": "d41d8cd98f00b204e9800998ecf8427e",
"splash/img/light-4x.gif": "d41d8cd98f00b204e9800998ecf8427e",
"splash/img/dark-2x.gif": "d41d8cd98f00b204e9800998ecf8427e",
"index.html": "8c8b72f6c60e58b6f2bc8829c1579299",
"/": "8c8b72f6c60e58b6f2bc8829c1579299",
"main.dart.js": "85d3ed919a40164c90b22cbd519ff86f",
"flutter.js": "7d69e653079438abfbb24b82a655b0a4",
"favicon.png": "d41d8cd98f00b204e9800998ecf8427e",
"icons/Icon-192.png": "d41d8cd98f00b204e9800998ecf8427e",
"icons/Icon-maskable-192.png": "d41d8cd98f00b204e9800998ecf8427e",
"icons/Icon-maskable-512.png": "d41d8cd98f00b204e9800998ecf8427e",
"icons/Icon-512.png": "d41d8cd98f00b204e9800998ecf8427e",
"manifest.json": "8822b58fff2b0c77e4d8301c16ae67f6",
"assets/AssetManifest.json": "b7ce97ddc0b577d3a62baa424609b567",
"assets/NOTICES": "8f120113ae14b7df50a6d47696471998",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "f81cf752cef9db44c3e2fc27b0eb13b1",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/fluttertoast/assets/toastify.js": "18cfdd77033aa55d215e8a78c090ba89",
"assets/packages/fluttertoast/assets/toastify.css": "910ddaaf9712a0b0392cf7975a3b7fb5",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/AssetManifest.bin": "2f7598204e6e0f77c5144b3923f7ed6a",
"assets/fonts/MaterialIcons-Regular.otf": "c138e311e2649230fd56195646604221",
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
"assets/assets/icons/meal_project.png": "afe5d0cac5876e3d5d5f2a7a77b8a668",
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
