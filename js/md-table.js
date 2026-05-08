(function() {
  'use strict';

  let cols = 3;
  let rows = 3;

  function generateTable() {
    cols = parseInt(document.getElementById('mdtable-cols').value) || 3;
    rows = parseInt(document.getElementById('mdtable-rows').value) || 3;

    const editor = document.getElementById('mdtable-editor');
    let html = '<table class="mdtable-edit-table"><thead><tr>';

    for (let c = 0; c < cols; c++) {
      html += '<th><input type="text" class="mdtable-cell" data-row="0" data-col="' + c + '" value="Header ' + (c + 1) + '"></th>';
    }
    html += '</tr></thead><tbody>';

    for (let r = 1; r <= rows; r++) {
      html += '<tr>';
      for (let c = 0; c < cols; c++) {
        html += '<td><input type="text" class="mdtable-cell" data-row="' + r + '" data-col="' + c + '" value=""></td>';
      }
      html += '</tr>';
    }

    html += '</tbody></table>';
    editor.innerHTML = html;
    updateOutput();
  }

  function updateOutput() {
    const cells = document.querySelectorAll('.mdtable-cell');
    const data = {};
    cells.forEach(cell => {
      const r = parseInt(cell.dataset.row);
      const c = parseInt(cell.dataset.col);
      if (!data[r]) data[r] = [];
      data[r][c] = cell.value;
    });

    let md = '';
    for (let r = 0; r <= rows; r++) {
      const row = data[r] || [];
      md += '| ' + row.map(v => v || '').join(' | ') + ' |\n';
      if (r === 0) {
        md += '|' + ' --- |'.repeat(cols) + '\n';
      }
    }

    document.getElementById('mdtable-output').textContent = md.trim();
  }

  function init() {
    document.getElementById('mdtable-generate').addEventListener('click', generateTable);
    document.getElementById('mdtable-copy').addEventListener('click', generateTable);
    document.getElementById('mdtable-copy-output').addEventListener('click', () => {
      const text = document.getElementById('mdtable-output').textContent;
      if (text && text !== '-') navigator.clipboard.writeText(text);
    });

    document.getElementById('mdtable-editor').addEventListener('input', (e) => {
      if (e.target.classList.contains('mdtable-cell')) updateOutput();
    });

    generateTable();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
