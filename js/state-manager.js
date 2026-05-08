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
      return sessionStorage.getItem(PREFIX + key);
    } catch (e) {
      return null;
    }
  }

  function restoreAll() {
    const textareas = ['jwt-input', 'json-input', 'jsonenc-input', 'regex-pattern', 'regex-flags', 'regex-test-string',
      'diff-original', 'diff-modified', 'hash-input', 'base64-input', 'url-input',
      'markdown-input', 'sql-input', 'cron-input', 'jwtgen-header', 'jwtgen-payload', 'jwtgen-secret',
      'notes-input', 'timestamp-input', 'color-hex', 'color-rgb', 'color-hsl'];

    textareas.forEach(id => {
      const val = load(id);
      const el = document.getElementById(id);
      if (val !== null && el) el.value = val;
    });

    const selects = ['idgen-country', 'lorem-type', 'unit-category-select', 'uuid-format'];
    selects.forEach(id => {
      const val = load(id);
      const el = document.getElementById(id);
      if (val && el) el.value = val;
    });

    const numbers = ['idgen-count', 'uuid-count', 'lorem-count', 'password-length', 'unit-from-value'];
    numbers.forEach(id => {
      const val = load(id);
      const el = document.getElementById(id);
      if (val !== null && el) el.value = val;
    });

    const activeTool = load('active-tool');
    if (activeTool) {
      const item = document.querySelector('.nav-dropdown-item[data-tool="' + activeTool + '"]');
      if (item) {
        item.click();
      }
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

    document.querySelectorAll('.nav-dropdown-item').forEach(item => {
      item.addEventListener('click', () => save('active-tool', item.dataset.tool));
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
