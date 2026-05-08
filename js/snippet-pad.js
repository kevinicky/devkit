(function() {
  'use strict';

  let snippets = [];
  let snippetId = 0;

  function render() {
    const container = document.getElementById('snippets-list');
    container.innerHTML = '';

    snippets.forEach(s => {
      const div = document.createElement('div');
      div.className = 'snippet-item';
      div.innerHTML = '<div class="snippet-header">' +
        '<input type="text" class="snippet-title" value="' + escapeHtml(s.title) + '" data-id="' + s.id + '" placeholder="Snippet name...">' +
        '<button class="snippet-remove" data-id="' + s.id + '">✕</button></div>' +
        '<textarea class="snippet-code" data-id="' + s.id + '" placeholder="Paste code..." spellcheck="false">' + escapeHtml(s.code) + '</textarea>';
      container.appendChild(div);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function init() {
    const addBtn = document.getElementById('snippets-add');
    const container = document.getElementById('snippets-list');

    addBtn.addEventListener('click', () => {
      snippetId++;
      snippets.push({ id: snippetId, title: 'Snippet ' + snippetId, code: '' });
      render();
    });

    container.addEventListener('input', (e) => {
      const id = parseInt(e.target.dataset.id);
      const s = snippets.find(s => s.id === id);
      if (!s) return;
      if (e.target.classList.contains('snippet-title')) s.title = e.target.value;
      if (e.target.classList.contains('snippet-code')) s.code = e.target.value;
    });

    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('snippet-remove')) {
        const id = parseInt(e.target.dataset.id);
        snippets = snippets.filter(s => s.id !== id);
        render();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
