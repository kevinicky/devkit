(function() {
  'use strict';

  const WORDS = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
    'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
    'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
    'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit',
    'voluptate', 'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'qui', 'officia', 'deserunt', 'mollit',
    'anim', 'id', 'est', 'laborum', 'at vero', 'eos', 'accusamus', 'iusto', 'odio', 'dignissimos',
    'ducimus', 'blanditiis', 'praesentium', 'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos',
    'dolores', 'quas', 'molestias', 'excepturi', 'obcaecati', 'cupiditate', 'provident', 'similique',
    'culpa', 'quaerat', 'impedit', 'nam', 'libero', 'tempore', 'cum', 'soluta', 'nobis', 'eligendi',
    'optio', 'cumque', 'impedit', 'porro', 'autem', 'tenetur', 'sapiente', 'delectus', 'reiciendis',
    'voluptatibus', 'maiores', 'alias', 'perferendis', 'doloribus', 'asperiores', 'repellat'
  ];

  function randomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  function randomSentence() {
    const len = Math.floor(Math.random() * 8) + 4;
    const words = [];
    for (let i = 0; i < len; i++) words.push(randomWord());
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  }

  function randomParagraph() {
    const len = Math.floor(Math.random() * 4) + 3;
    const sentences = [];
    for (let i = 0; i < len; i++) sentences.push(randomSentence());
    return sentences.join(' ');
  }

  function init() {
    const typeSelect = document.getElementById('lorem-type');
    const countInput = document.getElementById('lorem-count');
    const generateBtn = document.getElementById('lorem-generate');
    const outputEl = document.getElementById('lorem-output');
    const copyBtn = document.getElementById('lorem-copy');

    generateBtn.addEventListener('click', () => {
      const type = typeSelect.value;
      const count = Math.min(Math.max(parseInt(countInput.value) || 1, 1), 50);
      let result = '';

      if (type === 'words') {
        const words = [];
        for (let i = 0; i < count; i++) words.push(randomWord());
        result = words.join(' ');
      } else if (type === 'sentences') {
        const sentences = [];
        for (let i = 0; i < count; i++) sentences.push(randomSentence());
        result = sentences.join(' ');
      } else {
        const paragraphs = [];
        for (let i = 0; i < count; i++) paragraphs.push(randomParagraph());
        result = paragraphs.join('\n\n');
      }

      outputEl.textContent = result;
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
