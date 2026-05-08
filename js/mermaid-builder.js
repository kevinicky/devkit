(function() {
  'use strict';

  function generateFlowchart() {
    const dir = document.getElementById('mermaid-direction').value;
    const shape = document.getElementById('mermaid-shape').value;
    const nodesText = document.getElementById('mermaid-nodes').value.trim();
    const edgesText = document.getElementById('mermaid-edges').value.trim();

    if (!nodesText) return '';

    const shapeMap = { rect: '[', round: '(', diamond: '{', circle: '((', stadium: '([' };
    const shapeClose = { rect: ']', round: ')', diamond: '}', circle: '))', stadium: '])' };

    let md = 'flowchart ' + dir + '\n';

    const nodes = {};
    nodesText.split('\n').forEach(line => {
      const idx = line.indexOf(':');
      if (idx > 0) {
        const id = line.substring(0, idx).trim();
        const label = line.substring(idx + 1).trim();
        nodes[id] = label;
        md += '  ' + id + shapeMap[shape] + '"' + label + '"' + shapeClose[shape] + '\n';
      }
    });

    if (edgesText) {
      md += '\n';
      edgesText.split('\n').forEach(line => {
        const arrowMatch = line.match(/^(\w+)\s*(-+>|==>|-.->|==>)\s*\|?([^|]*)\|?\s*(\w+)$/);
        if (arrowMatch) {
          const from = arrowMatch[1];
          const arrow = arrowMatch[2];
          const label = arrowMatch[3].trim();
          const to = arrowMatch[4];
          md += '  ' + from + ' ' + arrow;
          if (label) md += '|' + label + '|';
          md += ' ' + to + '\n';
        }
      });
    }

    return md;
  }

  function generateSequence() {
    const actorsText = document.getElementById('mermaid-actors').value.trim();
    const messagesText = document.getElementById('mermaid-messages').value.trim();

    let md = 'sequenceDiagram\n';

    if (actorsText) {
      actorsText.split('\n').forEach(line => {
        const name = line.trim();
        if (name) md += '  participant ' + name + '\n';
      });
      md += '\n';
    }

    if (messagesText) {
      messagesText.split('\n').forEach(line => {
        const match = line.match(/^(\w+)\s*(-+>|-->>|->>|-x)\s*(\w+):\s*(.+)$/);
        if (match) {
          md += '  ' + match[1] + match[2] + match[3] + ': ' + match[4] + '\n';
        }
      });
    }

    return md;
  }

  function generateClass() {
    const classesText = document.getElementById('mermaid-classes').value.trim();
    const relationsText = document.getElementById('mermaid-relations').value.trim();

    let md = 'classDiagram\n';

    if (classesText) {
      classesText.split('\n').forEach(line => {
        const idx = line.indexOf(':');
        if (idx > 0) {
          const name = line.substring(0, idx).trim();
          const methods = line.substring(idx + 1).trim();
          md += '  class ' + name + ' {\n';
          methods.split(',').forEach(m => {
            md += '    ' + m.trim() + '\n';
          });
          md += '  }\n';
        }
      });
      md += '\n';
    }

    if (relationsText) {
      relationsText.split('\n').forEach(line => {
        const match = line.match(/^(\w+)\s*--\s*(\w+):\s*(.+)$/);
        if (match) {
          md += '  ' + match[1] + ' -- ' + match[2] + ' : ' + match[3] + '\n';
        }
      });
    }

    return md;
  }

  function generateState() {
    const statesText = document.getElementById('mermaid-states').value.trim();
    const transitionsText = document.getElementById('mermaid-transitions').value.trim();

    let md = 'stateDiagram-v2\n';

    if (statesText) {
      statesText.split('\n').forEach(line => {
        const idx = line.indexOf(':');
        if (idx > 0) {
          const id = line.substring(0, idx).trim();
          const name = line.substring(idx + 1).trim();
          md += '  state "' + name + '" as ' + id + '\n';
        }
      });
      md += '\n';
    }

    if (transitionsText) {
      transitionsText.split('\n').forEach(line => {
        const match = line.match(/^(\w+)\s*-->\s*(\w+):\s*(.+)$/);
        if (match) {
          md += '  ' + match[1] + ' --> ' + match[2] + ' : ' + match[3] + '\n';
        }
      });
    }

    return md;
  }

  function generateER() {
    const entitiesText = document.getElementById('mermaid-entities').value.trim();
    const relationsText = document.getElementById('mermaid-er-relations').value.trim();

    let md = 'erDiagram\n';

    if (entitiesText) {
      entitiesText.split('\n').forEach(line => {
        const idx = line.indexOf(':');
        if (idx > 0) {
          const name = line.substring(0, idx).trim();
          const fields = line.substring(idx + 1).trim();
          md += '  ' + name + ' {\n';
          fields.split(',').forEach(f => {
            md += '    ' + f.trim() + '\n';
          });
          md += '  }\n';
        }
      });
      md += '\n';
    }

    if (relationsText) {
      relationsText.split('\n').forEach(line => {
        const match = line.match(/^(\S+)\s*(\|?[o{}-]+\|?)\s*(\S+):\s*(.+)$/);
        if (match) {
          md += '  ' + match[1] + ' ' + match[2] + match[3] + ' : "' + match[4] + '"\n';
        }
      });
    }

    return md;
  }

  function generateGantt() {
    const tasksText = document.getElementById('mermaid-gantt-tasks').value.trim();

    let md = 'gantt\n';
    md += '  title Project Timeline\n';
    md += '  dateFormat  YYYY-MM-DD\n';
    md += '  axisFormat  %m/%d\n\n';

    if (tasksText) {
      tasksText.split('\n').forEach((line, i) => {
        const match = line.match(/^(.+?):\s*(\d{4}-\d{2}-\d{2}),\s*(\d+)d$/);
        if (match) {
          const name = match[1].trim();
          const start = match[2];
          const duration = match[3];
          md += '  ' + name + ' :' + (i === 0 ? 'a1, ' : 'after a' + i + ', ') + start + ', ' + duration + 'd\n';
        }
      });
    }

    return md;
  }

  function generatePie() {
    const slicesText = document.getElementById('mermaid-pie-slices').value.trim();

    let md = 'pie\n';
    md += '  title Distribution\n';

    if (slicesText) {
      slicesText.split('\n').forEach(line => {
        const match = line.match(/^(.+?):\s*(\d+)$/);
        if (match) {
          md += '  "' + match[1].trim() + '" : ' + match[2] + '\n';
        }
      });
    }

    return md;
  }

  function init() {
    const typeSelect = document.getElementById('mermaid-type');
    const generateBtn = document.getElementById('mermaid-generate');
    const outputEl = document.getElementById('mermaid-output');
    const copyBtn = document.getElementById('mermaid-copy');
    const clearBtn = document.getElementById('mermaid-clear');

    typeSelect.addEventListener('change', () => {
      document.querySelectorAll('.mermaid-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById('mermaid-' + typeSelect.value + '-panel');
      if (panel) panel.classList.add('active');
    });

    generateBtn.addEventListener('click', () => {
      const type = typeSelect.value;
      let md = '';
      if (type === 'flowchart') md = generateFlowchart();
      else if (type === 'sequence') md = generateSequence();
      else if (type === 'class') md = generateClass();
      else if (type === 'state') md = generateState();
      else if (type === 'er') md = generateER();
      else if (type === 'gantt') md = generateGantt();
      else if (type === 'pie') md = generatePie();

      if (md) {
        outputEl.textContent = md;
      } else {
        outputEl.textContent = 'No data provided';
      }
    });

    copyBtn.addEventListener('click', () => {
      const text = outputEl.textContent;
      if (text && !text.includes('placeholder')) navigator.clipboard.writeText(text);
    });

    clearBtn.addEventListener('click', () => {
      document.querySelectorAll('.mermaid-panel textarea').forEach(t => t.value = '');
      outputEl.innerHTML = '<span class="placeholder">Mermaid syntax will appear here</span>';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
