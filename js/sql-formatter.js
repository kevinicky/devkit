(function() {
  'use strict';

  const KEYWORDS = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AND', 'OR', 'NOT', 'NULL', 'AS', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'INTO', 'VALUES', 'SET', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX', 'UNIQUE', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'CONSTRAINT', 'DEFAULT', 'CHECK', 'UNION', 'ALL', 'EXISTS', 'BETWEEN', 'LIKE', 'IN', 'IS', 'ASC', 'DESC', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'IF', 'ELSEIF', 'BEGIN', 'COMMIT', 'ROLLBACK', 'GRANT', 'REVOKE', 'TRUNCATE', 'VIEW', 'WITH', 'RECURSIVE', 'OVER', 'PARTITION', 'ROW', 'ROWS', 'RANGE', 'UNBOUNDED', 'PRECEDING', 'FOLLOWING', 'CURRENT', 'CROSS', 'NATURAL', 'USING', 'FULL', 'CAST', 'CONVERT', 'COALESCE', 'NULLIF', 'EXTRACT', 'TRIM', 'UPPER', 'LOWER', 'LENGTH', 'SUBSTRING', 'CONCAT', 'REPLACE', 'ROUND', 'CEIL', 'FLOOR', 'ABS', 'NOW', 'DATE', 'TIME', 'TIMESTAMP', 'INTERVAL', 'EXPLAIN', 'ANALYZE', 'RETURNING'];

  function formatSQL(sql) {
    sql = sql.replace(/\s+/g, ' ').trim();

    let formatted = '';
    let indent = 0;
    const indentStr = '  ';
    const tokens = sql.split(/\s+/);

    const newlineBefore = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'CROSS', 'GROUP', 'ORDER', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'INSERT', 'UPDATE', 'DELETE', 'SET', 'VALUES', 'ON'];
    const increaseIndent = ['SELECT', 'WHERE', 'SET', 'VALUES'];
    const decreaseIndent = ['FROM', 'AND', 'OR', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'GROUP', 'ORDER', 'HAVING', 'LIMIT'];

    tokens.forEach((token, i) => {
      const upper = token.toUpperCase();

      if (decreaseIndent.includes(upper) && indent > 0) {
        indent--;
      }

      if (newlineBefore.includes(upper) && i > 0) {
        formatted += '\n' + indentStr.repeat(indent);
      }

      if (increaseIndent.includes(upper)) {
        indent++;
      }

      if (KEYWORDS.includes(upper)) {
        formatted += (formatted.endsWith('\n') || formatted === '' ? '' : ' ') + upper;
      } else {
        formatted += (formatted.endsWith('\n') ? '' : ' ') + token;
      }
    });

    return formatted.trim();
  }

  function minifySQL(sql) {
    return sql.replace(/\s+/g, ' ').trim();
  }

  function init() {
    const inputEl = document.getElementById('sql-input');
    const outputEl = document.getElementById('sql-output');
    const errorEl = document.getElementById('sql-error');
    const formatBtn = document.getElementById('sql-format');
    const minifyBtn = document.getElementById('sql-minify');
    const copyBtn = document.getElementById('sql-copy');
    const clearBtn = document.getElementById('sql-clear');

    function showError(msg) {
      errorEl.textContent = msg;
      errorEl.classList.remove('hidden');
    }

    function hideError() {
      errorEl.classList.add('hidden');
    }

    formatBtn.addEventListener('click', () => {
      hideError();
      const input = inputEl.value.trim();
      if (!input) { showError('Input is empty'); return; }
      outputEl.textContent = formatSQL(input);
    });

    minifyBtn.addEventListener('click', () => {
      hideError();
      const input = inputEl.value.trim();
      if (!input) { showError('Input is empty'); return; }
      outputEl.textContent = minifySQL(input);
    });

    copyBtn.addEventListener('click', () => {
      const text = outputEl.textContent;
      if (text && !text.includes('placeholder')) {
        navigator.clipboard.writeText(text).then(() => {
          const original = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = original; }, 1500);
        });
      }
    });

    clearBtn.addEventListener('click', () => {
      inputEl.value = '';
      outputEl.innerHTML = '<span class="placeholder">Formatted SQL will appear here</span>';
      hideError();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
