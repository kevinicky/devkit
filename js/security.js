(function() {
  'use strict';

  const LOCK_KEY = 'devkit-tab-lock';
  const HEARTBEAT_KEY = 'devkit-tab-heartbeat';
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
      const current = getLock();
      if (current && current.id === tabId) {
        localStorage.removeItem(LOCK_KEY);
      }
    } catch (e) {}
  }

  function updateHeartbeat() {
    try {
      localStorage.setItem(HEARTBEAT_KEY, JSON.stringify({ id: tabId, time: Date.now() }));
    } catch (e) {}
  }

  function isLockValid(lock) {
    if (!lock) return false;
    return (Date.now() - lock.time) < LOCK_TIMEOUT;
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
    updateHeartbeat();
    heartbeatInterval = setInterval(() => {
      if (!isBlocked) {
        setLock(tabId);
        updateHeartbeat();
      }
    }, HEARTBEAT_INTERVAL);
  }

  function stopHeartbeat() {
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
  }

  function acquireLock() {
    tabId = generateId();
    channel = new BroadcastChannel(CHANNEL_NAME);

    const existingLock = getLock();

    if (existingLock && isLockValid(existingLock)) {
      channel.postMessage({ type: 'ping', tabId: existingLock.id });

      setTimeout(() => {
        const currentLock = getLock();
        if (currentLock && currentLock.id === existingLock.id) {
          blockTab();
        } else {
          claimLock();
        }
      }, 300);
    } else {
      claimLock();
    }

    channel.onmessage = (e) => {
      const data = e.data;

      if (data.type === 'ping' && data.tabId === tabId) {
        setLock(tabId);
        updateHeartbeat();
      }

      if (data.type === 'lock' && data.tabId !== tabId) {
        const currentLock = getLock();
        if (currentLock && currentLock.id === data.tabId) {
          blockTab();
        }
      }

      if (data.type === 'unlock' && data.tabId !== tabId) {
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
  }

  function claimLock() {
    tabId = generateId();
    setLock(tabId);
    updateHeartbeat();
    startHeartbeat();

    if (channel) {
      channel.postMessage({ type: 'lock', tabId: tabId });
    }

    showApp();
  }

  function takeOver() {
    const currentLock = getLock();
    if (currentLock && channel) {
      channel.postMessage({ type: 'unlock', tabId: currentLock.id });
    }
    localStorage.removeItem(LOCK_KEY);
    setTimeout(() => claimLock(), 400);
  }

  function init() {
    document.getElementById('take-over-btn').addEventListener('click', takeOver);

    window.addEventListener('storage', (e) => {
      if (e.key === LOCK_KEY) {
        const newLock = getLock();
        if (newLock && newLock.id !== tabId && !isBlocked) {
          blockTab();
        }
      }
      if (e.key === HEARTBEAT_KEY && isBlocked) {
        const hb = JSON.parse(e.newValue || '{}');
        if (hb.id !== tabId && isLockValid(hb)) {
          blockTab();
        }
      }
    });

    window.addEventListener('beforeunload', () => {
      if (!isBlocked) {
        clearLock();
        if (channel) {
          channel.postMessage({ type: 'unlock', tabId: tabId });
        }
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
