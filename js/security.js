(function() {
  'use strict';

  const TAB_CHANNEL = 'devkit-tab-lock';
  const TAB_ID_KEY = 'devkit-tab-id';
  const LOCK_TIMEOUT = 5000;

  let tabId = null;
  let lockInterval = null;
  let isBlocked = false;

  function generateTabId() {
    return Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
  }

  function acquireLock() {
    const existingId = sessionStorage.getItem(TAB_ID_KEY);
    tabId = generateTabId();

    if (existingId && existingId !== tabId) {
      const bc = new BroadcastChannel(TAB_CHANNEL);
      bc.postMessage({ type: 'ping', tabId: existingId });
      bc.close();

      setTimeout(() => {
        const currentId = sessionStorage.getItem(TAB_ID_KEY);
        if (currentId === existingId) {
          blockTab();
          return;
        }
        activateTab();
      }, 100);
    } else {
      activateTab();
    }
  }

  function activateTab() {
    tabId = generateTabId();
    sessionStorage.setItem(TAB_ID_KEY, tabId);

    const bc = new BroadcastChannel(TAB_CHANNEL);
    bc.postMessage({ type: 'lock', tabId: tabId });

    bc.onmessage = (event) => {
      if (event.data.type === 'lock' && event.data.tabId !== tabId) {
        blockTab();
      }
    };

    lockInterval = setInterval(() => {
      if (sessionStorage.getItem(TAB_ID_KEY) === tabId) {
        sessionStorage.setItem(TAB_ID_KEY, tabId);
      } else {
        blockTab();
      }
    }, LOCK_TIMEOUT);

    bc.close();
    showApp();
  }

  function blockTab() {
    if (isBlocked) return;
    isBlocked = true;

    if (lockInterval) clearInterval(lockInterval);

    document.getElementById('tab-blocked').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
  }

  function showApp() {
    isBlocked = false;
    document.getElementById('tab-blocked').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
  }

  function takeOver() {
    sessionStorage.removeItem(TAB_ID_KEY);
    const bc = new BroadcastChannel(TAB_CHANNEL);
    bc.postMessage({ type: 'force-unlock' });
    bc.close();
    setTimeout(() => acquireLock(), 200);
  }

  function init() {
    document.getElementById('take-over-btn').addEventListener('click', takeOver);

    window.addEventListener('storage', (e) => {
      if (e.key === TAB_ID_KEY && e.newValue !== tabId && e.newValue !== null) {
        blockTab();
      }
    });

    window.addEventListener('beforeunload', () => {
      if (sessionStorage.getItem(TAB_ID_KEY) === tabId) {
        sessionStorage.removeItem(TAB_ID_KEY);
      }
    });

    acquireLock();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
