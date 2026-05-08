(function() {
  'use strict';

  const PREFIX = 'dk-';

  function save(key, value) {
    try {
      sessionStorage.setItem(PREFIX + key, typeof value === 'string' ? value : JSON.stringify(value));
    } catch (e) {}
  }

  function load(key) {
    try {
      const val = sessionStorage.getItem(PREFIX + key);
      return val;
    } catch (e) {
      return null;
    }
  }

  function saveText(id) {
    const el = document.getElementById(id);
    if (el) save(id, el.value);
  }

  function restoreText(id) {
    const val = load(id);
    const el = document.getElementById(id);
    if (val !== null && el) {
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  function restoreAll() {
    const textareas = ['jwt-input', 'json-input', 'regex-pattern', 'regex-flags', 'regex-test-string',
      'diff-original', 'diff-modified', 'hash-input', 'base64-input', 'url-input',
      'markdown-input', 'sql-input', 'cron-input', 'jwtgen-header', 'jwtgen-payload', 'jwtgen-secret',
      'notes-input', 'timestamp-input', 'color-hex', 'color-rgb', 'color-hsl'];

    textareas.forEach(id => restoreText(id));

    const selects = ['idgen-country', 'lorem-type', 'unit-category-select'];
    selects.forEach(id => {
      const val = load(id);
      const el = document.getElementById(id);
      if (val && el) { el.value = val; el.dispatchEvent(new Event('change', { bubbles: true })); }
    });

    const numbers = ['idgen-count', 'uuid-count', 'lorem-count', 'password-length', 'unit-from-value'];
    numbers.forEach(id => {
      const val = load(id);
      const el = document.getElementById(id);
      if (val !== null && el) { el.value = val; el.dispatchEvent(new Event('input', { bubbles: true })); }
    });

    const pomodoroSessions = load('pomodoro-sessions');
    const pomodoroTotal = load('pomodoro-total');
    if (pomodoroSessions) {
      window.__pomodoroState = { sessions: parseInt(pomodoroSessions), totalMinutes: parseInt(pomodoroTotal) };
    }

    const activeTool = load('active-tool');
    if (activeTool) {
      const btn = document.querySelector('[data-tool="' + activeTool + '"]');
      if (btn) btn.click();
    }
  }

  function initAutoSave() {
    const inputs = document.querySelectorAll('textarea, input[type="text"], input[type="number"], select');
    inputs.forEach(el => {
      if (el.id) {
        const eventType = el.tagName === 'SELECT' ? 'change' : 'input';
        el.addEventListener(eventType, () => {
          if (el.type === 'number' || el.type === 'range') {
            save(el.id, el.value);
          } else {
            save(el.id, el.value);
          }
        });
      }
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => save('active-tool', btn.dataset.tool));
    });

    setInterval(() => {
      const pomCount = document.getElementById('pomodoro-count');
      const pomTotal = document.getElementById('pomodoro-total');
      if (pomCount) save('pomodoro-sessions', pomCount.textContent);
      if (pomTotal) save('pomodoro-total', pomTotal.textContent);
    }, 5000);
  }

  function init() {
    restoreAll();
    initAutoSave();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
