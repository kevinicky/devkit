(function() {
  'use strict';

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function computeDiff(original, modified) {
    const origLines = original.split('\n');
    const modLines = modified.split('\n');
    const result = [];

    const m = origLines.length;
    const n = modLines.length;

    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (origLines[i - 1] === modLines[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    let i = m, j = n;
    const diff = [];

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && origLines[i - 1] === modLines[j - 1]) {
        diff.unshift({ type: 'unchanged', line: origLines[i - 1], lineNum: i });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        diff.unshift({ type: 'added', line: modLines[j - 1], lineNum: j });
        j--;
      } else if (i > 0) {
        diff.unshift({ type: 'removed', line: origLines[i - 1], lineNum: i });
        i--;
      }
    }

    return diff;
  }

  function renderDiff(diff) {
    let html = '';
    let origLine = 1;
    let modLine = 1;

    diff.forEach((d) => {
      const escaped = escapeHtml(d.line) || ' ';
      if (d.type === 'unchanged') {
        html += '<span class="diff-unchanged">  ' + String(origLine).padStart(4) + ' | ' + String(modLine).padStart(4) + ' | ' + escaped + '</span>\n';
        origLine++;
        modLine++;
      } else if (d.type === 'removed') {
        html += '<span class="diff-removed">- ' + String(origLine).padStart(4) + ' |      | ' + escaped + '</span>\n';
        origLine++;
      } else if (d.type === 'added') {
        html += '<span class="diff-added">+      | ' + String(modLine).padStart(4) + ' | ' + escaped + '</span>\n';
        modLine++;
      }
    });

    const added = diff.filter(d => d.type === 'added').length;
    const removed = diff.filter(d => d.type === 'removed').length;

    html += '\n---\n';
    html += '<span class="diff-added">+' + added + ' line' + (added !== 1 ? 's' : '') + ' added</span> ';
    html += '<span class="diff-removed">-' + removed + ' line' + (removed !== 1 ? 's' : '') + ' removed</span>';

    return html;
  }

  function init() {
    const originalEl = document.getElementById('diff-original');
    const modifiedEl = document.getElementById('diff-modified');
    const outputEl = document.getElementById('diff-output');
    const compareBtn = document.getElementById('diff-compare');
    const clearBtn = document.getElementById('diff-clear');

    compareBtn.addEventListener('click', () => {
      const original = originalEl.value;
      const modified = modifiedEl.value;

      if (!original && !modified) {
        outputEl.innerHTML = '<span class="placeholder">Enter text in both fields to compare</span>';
        return;
      }

      const diff = computeDiff(original, modified);
      outputEl.innerHTML = renderDiff(diff);
    });

    clearBtn.addEventListener('click', () => {
      originalEl.value = '';
      modifiedEl.value = '';
      outputEl.innerHTML = '<span class="placeholder">Diff result will appear here</span>';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
