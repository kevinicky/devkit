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

    const selects = ['idgen-country', 'lorem-type', 'unit-category-select', 'uuid-format'];
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

    const activeTool = load('active-tool');
    if (activeTool) {
      const btn = document.querySelector('[data-tool="' + activeTool + '"]');
      if (btn) btn.click();
    }
  }

  function initAutoSave() {
    const inputs = document.querySelectorAll('textarea, input[type="text"], input[type="number"], input[type="range"], select');
    inputs.forEach(el => {
      if (el.id) {
        const eventType = el.tagName === 'SELECT' ? 'change' : 'input';
        el.addEventListener(eventType, () => save(el.id, el.value));
      }
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => save('active-tool', btn.dataset.tool));
    });
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
