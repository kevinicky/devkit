(function() {
  'use strict';

  let items = [];

  function render() {
    const container = document.getElementById('checklist-items');
    const countEl = document.getElementById('checklist-count');

    container.innerHTML = '';
    items.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'checklist-item' + (item.done ? ' done' : '');
      div.innerHTML = '<input type="checkbox" ' + (item.done ? 'checked' : '') + ' data-idx="' + i + '">' +
        '<span class="checklist-text">' + escapeHtml(item.text) + '</span>' +
        '<button class="checklist-remove" data-idx="' + i + '">✕</button>';
      container.appendChild(div);
    });

    const done = items.filter(i => i.done).length;
    countEl.textContent = done + '/' + items.length + ' done';
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function init() {
    const inputEl = document.getElementById('checklist-input');
    const addBtn = document.getElementById('checklist-add');
    const clearBtn = document.getElementById('checklist-clear');
    const container = document.getElementById('checklist-items');

    function addItem() {
      const text = inputEl.value.trim();
      if (!text) return;
      items.push({ text: text, done: false });
      inputEl.value = '';
      render();
    }

    addBtn.addEventListener('click', addItem);
    inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') addItem(); });

    container.addEventListener('click', (e) => {
      if (e.target.type === 'checkbox') {
        items[e.target.dataset.idx].done = e.target.checked;
        render();
      }
      if (e.target.classList.contains('checklist-remove')) {
        items.splice(e.target.dataset.idx, 1);
        render();
      }
    });

    clearBtn.addEventListener('click', () => { items = []; render(); });
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
