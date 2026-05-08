(function() {
  'use strict';

  function yamlToJson(yaml) {
    const lines = yaml.split('\n');
    const result = {};
    const stack = [{ obj: result, indent: -1 }];

    lines.forEach(line => {
      if (!line.trim() || line.trim().startsWith('#')) return;

      const indent = line.search(/\S/);
      const content = line.trim();

      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }

      const parent = stack[stack.length - 1].obj;

      if (content.startsWith('- ')) {
        if (!Array.isArray(parent)) {
          const key = Object.keys(parent).pop();
          if (key && !Array.isArray(parent[key])) parent[key] = [];
          if (key && Array.isArray(parent[key])) {
            parent[key].push(content.slice(2).trim());
            stack.push({ obj: parent[key], indent: indent });
          }
        } else {
          parent.push(content.slice(2).trim());
        }
        return;
      }

      const colonIdx = content.indexOf(':');
      if (colonIdx > 0) {
        const key = content.substring(0, colonIdx).trim();
        let value = content.substring(colonIdx + 1).trim();

        if (value === '' || value === '|' || value === '>') {
          parent[key] = {};
          stack.push({ obj: parent[key], indent: indent });
        } else if (value === '[]') {
          parent[key] = [];
        } else if (value === '{}') {
          parent[key] = {};
        } else {
          if (value === 'true') value = true;
          else if (value === 'false') value = false;
          else if (value === 'null') value = null;
          else if (!isNaN(value) && value !== '') value = Number(value);
          else if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
          parent[key] = value;
        }
      }
    });

    return result;
  }

  function jsonToYaml(obj, indent) {
    indent = indent || 0;
    const spaces = '  '.repeat(indent);
    let yaml = '';

    if (Array.isArray(obj)) {
      obj.forEach(item => {
        if (typeof item === 'object' && item !== null) {
          yaml += spaces + '-\n' + jsonToYaml(item, indent + 1);
        } else {
          yaml += spaces + '- ' + formatYamlValue(item) + '\n';
        }
      });
    } else if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
          yaml += spaces + key + ':\n' + jsonToYaml(value, indent + 1);
        } else {
          yaml += spaces + key + ': ' + formatYamlValue(value) + '\n';
        }
      });
    }

    return yaml;
  }

  function formatYamlValue(val) {
    if (val === null) return 'null';
    if (typeof val === 'boolean') return val.toString();
    if (typeof val === 'number') return val.toString();
    if (typeof val === 'string') {
      if (val.includes(':') || val.includes('#') || val.includes(',') || val === '' || val === 'true' || val === 'false' || val === 'null') {
        return '"' + val + '"';
      }
      return val;
    }
    return String(val);
  }

  function init() {
    const inputEl = document.getElementById('yaml-input');
    const outputEl = document.getElementById('yaml-output');
    const errorEl = document.getElementById('yaml-error');
    const toJsonBtn = document.getElementById('yaml-tojson');
    const toYamlBtn = document.getElementById('yaml-toyaml');
    const swapBtn = document.getElementById('yaml-swap');
    const copyBtn = document.getElementById('yaml-copy');
    const clearBtn = document.getElementById('yaml-clear');

    function showError(msg) {
      errorEl.textContent = msg;
      errorEl.classList.remove('hidden');
    }

    function hideError() {
      errorEl.classList.add('hidden');
    }

    toJsonBtn.addEventListener('click', () => {
      hideError();
      const input = inputEl.value.trim();
      if (!input) { showError('Input is empty'); return; }
      try {
        const obj = yamlToJson(input);
        outputEl.textContent = JSON.stringify(obj, null, 2);
      } catch (e) {
        showError('YAML parse error: ' + e.message);
      }
    });

    toYamlBtn.addEventListener('click', () => {
      hideError();
      const input = inputEl.value.trim();
      if (!input) { showError('Input is empty'); return; }
      try {
        const obj = JSON.parse(input);
        outputEl.textContent = jsonToYaml(obj);
      } catch (e) {
        showError('JSON parse error: ' + e.message);
      }
    });

    swapBtn.addEventListener('click', () => {
      const output = outputEl.textContent;
      if (output && !output.includes('placeholder')) {
        inputEl.value = output;
        outputEl.innerHTML = '<span class="placeholder">Output will appear here</span>';
      }
    });

    copyBtn.addEventListener('click', () => {
      const text = outputEl.textContent;
      if (text && !text.includes('placeholder')) navigator.clipboard.writeText(text);
    });

    clearBtn.addEventListener('click', () => {
      inputEl.value = '';
      outputEl.innerHTML = '<span class="placeholder">Output will appear here</span>';
      hideError();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
