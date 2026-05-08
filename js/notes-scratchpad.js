(function() {
  'use strict';

  function init() {
    const inputEl = document.getElementById('notes-input');
    const clearBtn = document.getElementById('notes-clear');
    const charsEl = document.getElementById('notes-chars');
    const wordsEl = document.getElementById('notes-words');
    const linesEl = document.getElementById('notes-lines');

    function updateStats() {
      const text = inputEl.value;
      charsEl.textContent = text.length + ' characters';
      wordsEl.textContent = (text.trim() === '' ? 0 : text.trim().split(/\s+/).length) + ' words';
      linesEl.textContent = (text === '' ? 0 : text.split('\n').length) + ' lines';
    }

    inputEl.addEventListener('input', updateStats);

    clearBtn.addEventListener('click', () => {
      inputEl.value = '';
      updateStats();
    });

    updateStats();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
