(function() {
  'use strict';

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function testRegex(pattern, flags, testString) {
    try {
      const regex = new RegExp(pattern, flags);
      const matches = [];
      let match;

      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          });
          if (!regex.global) break;
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      }

      return { matches, error: null };
    } catch (e) {
      return { matches: [], error: e.message };
    }
  }

  function highlightMatches(pattern, flags, testString) {
    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      return escapeHtml(testString).replace(regex, (match) => {
        return '<span class="regex-match-highlight">' + match + '</span>';
      });
    } catch (e) {
      return escapeHtml(testString);
    }
  }

  function init() {
    const patternInput = document.getElementById('regex-pattern');
    const flagsInput = document.getElementById('regex-flags');
    const testStringInput = document.getElementById('regex-test-string');
    const matchesEl = document.getElementById('regex-matches');
    const errorEl = document.getElementById('regex-error');

    let debounceTimer = null;

    function runTest() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const pattern = patternInput.value;
        const flags = flagsInput.value;
        const testString = testStringInput.value;

        if (!pattern || !testString) {
          matchesEl.innerHTML = '<span class="placeholder">Matches will appear here</span>';
          errorEl.classList.add('hidden');
          return;
        }

        const result = testRegex(pattern, flags, testString);

        if (result.error) {
          errorEl.textContent = 'Regex Error: ' + result.error;
          errorEl.classList.remove('hidden');
          matchesEl.innerHTML = '';
          return;
        }

        errorEl.classList.add('hidden');

        if (result.matches.length === 0) {
          matchesEl.innerHTML = '<span class="placeholder">No matches found</span>';
          return;
        }

        let html = '<div class="regex-highlight">' + highlightMatches(pattern, flags, testString) + '</div>';
        html += '\n\n--- Matches ---\n\n';

        result.matches.forEach((m, i) => {
          html += 'Match ' + (i + 1) + ': "' + escapeHtml(m.match) + '" at index ' + m.index + '\n';
          if (m.groups.length > 0) {
            m.groups.forEach((g, j) => {
              html += '  Group ' + (j + 1) + ': ' + (g !== undefined ? '"' + escapeHtml(g) + '"' : 'undefined') + '\n';
            });
          }
        });

        html += '\nTotal: ' + result.matches.length + ' match' + (result.matches.length !== 1 ? 'es' : '');

        matchesEl.innerHTML = html;
      }, 200);
    }

    patternInput.addEventListener('input', runTest);
    flagsInput.addEventListener('input', runTest);
    testStringInput.addEventListener('input', runTest);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
