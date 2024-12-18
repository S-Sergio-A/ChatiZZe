import { precacheAndRoute } from "workbox-precaching";
import { CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { registerRoute } from "workbox-routing";
import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";

precacheAndRoute(self.__WB_MANIFEST, {
  cleanURLs: true,
  directoryIndex: null,
  urlManipulation: ({ url }) => {
    if (url.pathname.includes("invalid")) {
      console.warn(`Skipping invalid resource: ${url}`);
      return null;
    }
    return [url];
  }
});

registerRoute(
  ({ request, url }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 7 * 24 * 60 * 60
      }),
      {
        fetchDidFail: async ({ originalRequest }) => {
          console.error(`Failed to fetch resource: ${originalRequest.url}`);
        }
      }
    ]
  })
);

registerRoute(
  ({ url }) => url.origin === "https://www.chatterly.top",
  new CacheFirst({
    cacheName: "medium-cache",
    matchOptions: {
      ignoreVary: true
    },
    plugins: [
      new ExpirationPlugin({
        maxEntries: 300,
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
);

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
    clientsClaim();
  }
});

self.addEventListener("quotaerror", () => {
  caches.keys().then((keys) => {
    keys.forEach((key) => caches.delete(key));
    console.warn("Cache deleted due to quota errors.");
  });
});
