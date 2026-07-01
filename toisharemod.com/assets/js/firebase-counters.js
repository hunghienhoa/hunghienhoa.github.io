/* global firebase */

(function () {
  function hasFirebaseConfig() {
    return (
      typeof window !== "undefined" &&
      window.FIREBASE_CONFIG &&
      typeof window.FIREBASE_CONFIG.databaseURL === "string" &&
      window.FIREBASE_CONFIG.databaseURL.startsWith("http")
    );
  }

  function initFirebase() {
    if (!hasFirebaseConfig()) return null;
    if (typeof firebase === "undefined" || !firebase.initializeApp) return null;
    if (firebase.apps && firebase.apps.length) return firebase.app();
    try {
      return firebase.initializeApp(window.FIREBASE_CONFIG);
    } catch (e) {
      // Nếu config sai hoặc Firebase chưa load, bỏ qua.
      return null;
    }
  }

  function getDb() {
    const app = initFirebase();
    if (!app || !firebase.database) return null;
    try {
      return firebase.database();
    } catch (e) {
      return null;
    }
  }

  function isEnabled() {
    return !!getDb();
  }

  function todayKey() {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}${mm}${dd}`;
  }

  function canIncrement(localKey) {
    try {
      return localStorage.getItem(localKey) !== "1";
    } catch (e) {
      return true;
    }
  }

  function markIncremented(localKey) {
    try {
      localStorage.setItem(localKey, "1");
    } catch (e) {
      // ignore
    }
  }

  function formatNumber(n) {
    if (typeof n !== "number" || Number.isNaN(n)) return "0";
    try {
      return n.toLocaleString("vi-VN");
    } catch (e) {
      return String(n);
    }
  }

  function refFor(appId, field) {
    return `apps/${appId}/${field}`;
  }

  function increment(appId, field, throttleScope) {
    const db = getDb();
    if (!db || !appId) return;

    const key = `rtdb_${field}_${appId}_${throttleScope || todayKey()}`;
    if (!canIncrement(key)) return;

    const ref = db.ref(refFor(appId, field));
    ref
      .transaction((current) => (typeof current === "number" ? current + 1 : 1))
      .then(() => markIncremented(key))
      .catch(() => {
        // ignore
      });
  }

  function watch(appId, field, elementId) {
    const db = getDb();
    if (!db || !appId) return;

    const el = document.getElementById(elementId);
    if (!el) return;

    const ref = db.ref(refFor(appId, field));
    ref.on(
      "value",
      (snap) => {
        const val = snap.val();
        el.textContent = formatNumber(typeof val === "number" ? val : 0);
      },
      () => {
        // ignore
      }
    );
  }

  function watchElement(appId, field, element) {
    const db = getDb();
    if (!db || !appId || !element) return;

    const ref = db.ref(refFor(appId, field));
    ref.on(
      "value",
      (snap) => {
        const val = snap.val();
        element.textContent = formatNumber(typeof val === "number" ? val : 0);
      },
      () => {
        // ignore
      }
    );
  }

  function bindCounterElements(scope = document) {
    if (!isEnabled() || !scope || !scope.querySelectorAll) return;
    scope.querySelectorAll("[data-counter-field][data-app-id]").forEach((element) => {
      const field = element.getAttribute("data-counter-field");
      const appId = element.getAttribute("data-app-id");
      if (!field || !appId) return;
      watchElement(appId, field, element);
    });
  }

  // Public API
  window.RtdbCounters = {
    isEnabled,
    incrementView: (appId) => increment(appId, "views", todayKey()),
    incrementDownload: (appId) => increment(appId, "downloads", `${todayKey()}_download`),
    watchViews: (appId, elementId) => watch(appId, "views", elementId),
    watchDownloads: (appId, elementId) => watch(appId, "downloads", elementId),
    bindCounterElements
  };
})();
