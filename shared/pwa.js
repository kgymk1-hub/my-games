(function () {
  "use strict";

  if (!("serviceWorker" in navigator)) return;

  const scriptUrl = new URL(document.currentScript.src);
  const serviceWorkerUrl = new URL("../service-worker.js", scriptUrl);

  window.addEventListener("load", function () {
    navigator.serviceWorker.register(serviceWorkerUrl).catch(function (error) {
      console.warn("Service worker registration failed:", error);
    });
  });
}());
