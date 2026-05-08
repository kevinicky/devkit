(function() {
  'use strict';

  function diffJson(obj1, obj2, path) {
    path = path || '';
    const diffs = [];

    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    allKeys.forEach(key => {
      const currentPath = path ? path + '.' + key : key;
      const val1 = obj1[key];
      const val2 = obj2[key];

      if (!(key in obj1)) {
        diffs.push({ path: currentPath, type: 'added', value: val2 });
      } else if (!(key in obj2)) {
        diffs.push({ path: currentPath, type: 'removed', value: val1 });
      } else if (typeof val1 !== typeof val2) {
        diffs.push({ path: currentPath, type: 'changed', from: val1, to: val2 });
      } else if (val1 === null || val2 === null || typeof val1 !== 'object') {
        if (val1 !== val2) {
          diffs.push({ path: currentPath, type: 'changed', from: val1, to: val2 });
        }
      } else if (Array.isArray(val1) !== Array.isArray(val2)) {
        diffs.push({ path: currentPath, type: 'changed', from: val1, to: val2 });
      } else if (Array.isArray(val1) && Array.isArray(val2)) {
        if (JSON.stringify(val1) !== JSON.stringify(val2)) {
          diffs.push({ path: currentPath, type: 'changed', from: val1, to: val2 });
        }
      } else {
        diffs.push(...diffJson(val1, val2, currentPath));
      }
    });

    return diffs;
  }

  function init() {
    const originalEl = document.getElementById('diffjson-original');
    const modifiedEl = document.getElementById('diffjson-modified');
    const outputEl = document.getElementById('diffjson-output');
    const errorEl = document.getElementById('diffjson-error');
    const compareBtn = document.getElementById('diffjson-compare');
    const clearBtn = document.getElementById('diffjson-clear');

    function showError(msg) {
      errorEl.textContent = msg;
      errorEl.classList.remove('hidden');
    }

    function hideError() {
      errorEl.classList.add('hidden');
    }

    compareBtn.addEventListener('click', () => {
      hideError();
      let obj1, obj2;
      try { obj1 = JSON.parse(originalEl.value); } catch (e) { showError('Invalid JSON in original: ' + e.message); return; }
      try { obj2 = JSON.parse(modifiedEl.value); } catch (e) { showError('Invalid JSON in modified: ' + e.message); return; }

      const diffs = diffJson(obj1, obj2);

      if (diffs.length === 0) {
        outputEl.innerHTML = '<span style="color:var(--accent-success)">✓ JSON objects are identical</span>';
        return;
      }

      let html = diffs.length + ' difference' + (diffs.length !== 1 ? 's' : '') + ' found:\n\n';
      diffs.forEach(d => {
        if (d.type === 'added') {
          html += '<span class="diff-added">+ ' + d.path + ': ' + JSON.stringify(d.value, null, 2) + '</span>\n';
        } else if (d.type === 'removed') {
          html += '<span class="diff-removed">- ' + d.path + ': ' + JSON.stringify(d.value, null, 2) + '</span>\n';
        } else {
          html += '<span class="diff-removed">- ' + d.path + ': ' + JSON.stringify(d.from) + '</span>\n';
          html += '<span class="diff-added">+ ' + d.path + ': ' + JSON.stringify(d.to) + '</span>\n';
        }
      });

      outputEl.innerHTML = html;
    });

    clearBtn.addEventListener('click', () => {
      originalEl.value = '';
      modifiedEl.value = '';
      outputEl.innerHTML = '<span class="placeholder">JSON diff will appear here</span>';
      hideError();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
