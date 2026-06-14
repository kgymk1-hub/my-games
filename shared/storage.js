(function () {
  "use strict";

  const memoryStore = new Map();

  function normalize(value, fallback) {
    return value === null || value === undefined ? fallback : value;
  }

  const SafeStorage = {
    get(key, fallback = null) {
      try {
        return normalize(window.localStorage.getItem(key), fallback);
      } catch (_) {
        return memoryStore.has(key) ? memoryStore.get(key) : fallback;
      }
    },
    set(key, value) {
      const stringValue = String(value);
      try {
        window.localStorage.setItem(key, stringValue);
        memoryStore.set(key, stringValue);
        return true;
      } catch (_) {
        memoryStore.set(key, stringValue);
        return false;
      }
    },
    remove(key) {
      try {
        window.localStorage.removeItem(key);
      } catch (_) {}
      memoryStore.delete(key);
    },
    getJSON(key, fallback = null) {
      const raw = this.get(key, null);
      if (raw === null) return fallback;
      try {
        return JSON.parse(raw);
      } catch (_) {
        return fallback;
      }
    },
    setJSON(key, value) {
      return this.set(key, JSON.stringify(value));
    },
    key(parts) {
      return ["myGames", ...parts].join(":");
    }
  };

  window.SafeStorage = SafeStorage;
}());
