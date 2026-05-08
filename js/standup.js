(function() {
  'use strict';

  function init() {
    const yesterdayEl = document.getElementById('standup-yesterday');
    const todayEl = document.getElementById('standup-today');
    const blockersEl = document.getElementById('standup-blockers');
    const copyBtn = document.getElementById('standup-copy');
    const clearBtn = document.getElementById('standup-clear');

    copyBtn.addEventListener('click', () => {
      let text = '*Yesterday*\n';
      text += (yesterdayEl.value || 'Nothing') + '\n\n';
      text += '*Today*\n';
      text += (todayEl.value || 'Nothing') + '\n\n';
      text += '*Blockers*\n';
      text += (blockersEl.value || 'None') + '\n';
      navigator.clipboard.writeText(text);
    });

    clearBtn.addEventListener('click', () => {
      yesterdayEl.value = '';
      todayEl.value = '';
      blockersEl.value = '';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
