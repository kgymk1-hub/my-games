(function () {
  "use strict";

  window.createRafScheduler = function createRafScheduler(callback) {
    let rafId = 0;
    return function schedule() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        callback();
      });
    };
  };
}());
