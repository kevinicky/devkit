(function() {
  'use strict';

  const LOCK_KEY = 'devkit-tab-lock';
  const TAB_ID_KEY = 'devkit-tab-id';
  const CHANNEL_NAME = 'devkit-tab-channel';
  const HEARTBEAT_INTERVAL = 2000;
  const LOCK_TIMEOUT = 5000;

  let tabId = null;
  let heartbeatInterval = null;
  let isBlocked = false;
  let channel = null;

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  function getLock() {
    try {
      const data = localStorage.getItem(LOCK_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function setLock(id) {
    try {
      localStorage.setItem(LOCK_KEY, JSON.stringify({ id: id, time: Date.now() }));
    } catch (e) {}
  }

  function clearLock() {
    try {
      localStorage.removeItem(LOCK_KEY);
    } catch (e) {}
  }

  function blockTab() {
    if (isBlocked) return;
    isBlocked = true;
    stopHeartbeat();
    document.getElementById('tab-blocked').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
  }

  function showApp() {
    isBlocked = false;
    document.getElementById('tab-blocked').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
  }

  function startHeartbeat() {
    heartbeatInterval = setInterval(() => {
      if (!isBlocked && tabId) {
        setLock(tabId);
      }
    }, HEARTBEAT_INTERVAL);
  }

  function stopHeartbeat() {
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
  }

  function claimLock() {
    tabId = generateId();
    sessionStorage.setItem(TAB_ID_KEY, tabId);
    setLock(tabId);
    startHeartbeat();

    if (channel) {
      channel.postMessage({ type: 'lock', tabId: tabId });
    }

    showApp();
  }

  function isSameTabRefresh() {
    const existingTabId = sessionStorage.getItem(TAB_ID_KEY);
    if (existingTabId) {
      const lock = getLock();
      if (lock && lock.id === existingTabId) {
        tabId = existingTabId;
        setLock(tabId);
        startHeartbeat();
        showApp();
        return true;
      }
    }
    return false;
  }

  function takeOver() {
    clearLock();
    if (channel) {
      channel.postMessage({ type: 'unlock', tabId: 'force' });
    }
    setTimeout(() => claimLock(), 300);
  }

  function init() {
    document.getElementById('take-over-btn').addEventListener('click', takeOver);
    channel = new BroadcastChannel(CHANNEL_NAME);

    if (isSameTabRefresh()) return;

    const existingLock = getLock();

    if (existingLock && (Date.now() - existingLock.time) < LOCK_TIMEOUT) {
      blockTab();
    } else {
      claimLock();
    }

    channel.onmessage = (e) => {
      const data = e.data;

      if (data.type === 'lock' && data.tabId !== tabId) {
        const currentLock = getLock();
        if (currentLock && currentLock.id === data.tabId) {
          blockTab();
        }
      }

      if (data.type === 'unlock') {
        const currentLock = getLock();
        if (currentLock && currentLock.id === data.tabId) {
          setTimeout(() => {
            if (isBlocked) {
              const newLock = getLock();
              if (!newLock || newLock.id === data.tabId) {
                claimLock();
              }
            }
          }, 500);
        }
      }
    };

    window.addEventListener('storage', (e) => {
      if (e.key === LOCK_KEY) {
        const newLock = getLock();
        if (newLock && newLock.id !== tabId && !isBlocked) {
          blockTab();
        }
      }
    });

    window.addEventListener('beforeunload', () => {
      if (!isBlocked && tabId) {
        clearLock();
        if (channel) {
          channel.postMessage({ type: 'unlock', tabId: tabId });
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
