importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js",
);

//custom adjustments
//bootstrap
workbox.routing.registerRoute(
  new RegExp("https:.*min.(css|js)"),
  new workbox.strategies.CacheFirst(),
);
workbox.routing.registerRoute(
  new RegExp("/api/"),
  new workbox.strategies.StaleWhileRevalidate(),
);
workbox.precaching.precacheAndRoute([]);
