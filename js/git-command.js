(function() {
  'use strict';

  function init() {
    const typeSelect = document.getElementById('gitcmd-type');
    const generateBtn = document.getElementById('gitcmd-generate');
    const outputEl = document.getElementById('gitcmd-output');
    const copyBtn = document.getElementById('gitcmd-copy');

    typeSelect.addEventListener('change', () => {
      document.querySelectorAll('.gitcmd-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById('gitcmd-' + typeSelect.value + '-panel');
      if (panel) panel.classList.add('active');
    });

    generateBtn.addEventListener('click', () => {
      const type = typeSelect.value;
      let cmd = '';

      if (type === 'branch') {
        const name = document.getElementById('gitcmd-branch-name').value.trim();
        const action = document.getElementById('gitcmd-branch-action').value;
        if (!name && action !== 'list') { cmd = '# Enter a branch name'; }
        else if (action === 'create') cmd = 'git branch ' + name;
        else if (action === 'create-switch') cmd = 'git checkout -b ' + name;
        else if (action === 'switch') cmd = 'git checkout ' + name;
        else if (action === 'delete') cmd = 'git branch -d ' + name;
        else if (action === 'delete-remote') cmd = 'git push origin --delete ' + name;
        else if (action === 'push') cmd = 'git push origin ' + name;
        else if (action === 'push-set') cmd = 'git push -u origin ' + name;
      } else if (type === 'merge') {
        const branch = document.getElementById('gitcmd-merge-branch').value.trim();
        const opt = document.getElementById('gitcmd-merge-opt').value;
        if (!branch) { cmd = '# Enter a branch name'; }
        else { cmd = 'git merge ' + (opt ? opt + ' ' : '') + branch; }
      } else if (type === 'rebase') {
        const onto = document.getElementById('gitcmd-rebase-onto').value.trim();
        const opt = document.getElementById('gitcmd-rebase-opt').value;
        if (!onto) { cmd = '# Enter target branch'; }
        else { cmd = 'git rebase ' + (opt ? opt + ' ' : '') + onto; }
      } else if (type === 'reset') {
        const target = document.getElementById('gitcmd-reset-target').value.trim() || 'HEAD';
        const rtype = document.getElementById('gitcmd-reset-type').value;
        cmd = 'git reset ' + rtype + ' ' + target;
      } else if (type === 'cherry') {
        const hash = document.getElementById('gitcmd-cherry-hash').value.trim();
        if (!hash) { cmd = '# Enter commit hash'; }
        else { cmd = 'git cherry-pick ' + hash; }
      } else if (type === 'tag') {
        const name = document.getElementById('gitcmd-tag-name').value.trim();
        const action = document.getElementById('gitcmd-tag-action').value;
        if (!name && action !== 'list') { cmd = '# Enter tag name'; }
        else if (action === 'create') cmd = 'git tag ' + name;
        else if (action === 'create-push') cmd = 'git tag ' + name + ' && git push origin ' + name;
        else if (action === 'delete') cmd = 'git tag -d ' + name + ' && git push origin --delete ' + name;
        else if (action === 'list') cmd = 'git tag -l';
      } else if (type === 'remote') {
        const name = document.getElementById('gitcmd-remote-name').value.trim();
        const url = document.getElementById('gitcmd-remote-url').value.trim();
        const action = document.getElementById('gitcmd-remote-action').value;
        if (!name) { cmd = '# Enter remote name'; }
        else if (action === 'add') { cmd = url ? 'git remote add ' + name + ' ' + url : '# Enter URL'; }
        else if (action === 'remove') cmd = 'git remote remove ' + name;
        else if (action === 'set-url') { cmd = url ? 'git remote set-url ' + name + ' ' + url : '# Enter URL'; }
        else if (action === 'show') cmd = 'git remote -v';
      } else if (type === 'log') {
        const format = document.getElementById('gitcmd-log-format').value;
        const limit = document.getElementById('gitcmd-log-limit').value;
        cmd = 'git log ';
        if (format === 'oneline') cmd += '--oneline ';
        else if (format === 'graph') cmd += '--graph --oneline --decorate ';
        else if (format === 'stat') cmd += '--stat ';
        cmd += '-' + limit;
      }

      outputEl.textContent = cmd;
    });

    copyBtn.addEventListener('click', () => {
      const text = outputEl.textContent;
      if (text && text !== '-') navigator.clipboard.writeText(text);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
