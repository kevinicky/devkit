(function() {
  'use strict';

  let timerInterval = null;
  let timeLeft = 25 * 60;
  let totalTime = 25 * 60;
  let isRunning = false;
  let currentMode = 'work';
  let sessions = 0;
  let totalMinutes = 0;

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
  }

  function updateDisplay() {
    document.getElementById('timer-time').textContent = formatTime(timeLeft);
    document.getElementById('timer-mode').textContent = currentMode.charAt(0).toUpperCase() + currentMode.slice(1);
    document.getElementById('pomodoro-count').textContent = sessions;
    document.getElementById('pomodoro-total').textContent = totalMinutes + 'm';
  }

  function startTimer() {
    if (isRunning) {
      clearInterval(timerInterval);
      isRunning = false;
      document.getElementById('timer-start').textContent = 'Start';
      return;
    }

    isRunning = true;
    document.getElementById('timer-start').textContent = 'Pause';

    timerInterval = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        document.getElementById('timer-start').textContent = 'Start';

        if (currentMode === 'work') {
          sessions++;
          totalMinutes += Math.round(totalTime / 60);
        }

        updateDisplay();
        try {
          new Audio('data:audio/wav;base64,UklGRl9vT19teleXQBAABAAEARAAEQACABAAEABkYXRhQe8AAH//f/9//3//').play().catch(() => {});
        } catch (e) {}

        alert(currentMode === 'work' ? 'Work session complete! Take a break.' : 'Break over! Ready to work?');
      }
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = totalTime;
    document.getElementById('timer-start').textContent = 'Start';
    updateDisplay();
  }

  function setMode(mode, minutes) {
    clearInterval(timerInterval);
    isRunning = false;
    currentMode = mode;
    totalTime = minutes * 60;
    timeLeft = totalTime;
    document.getElementById('timer-start').textContent = 'Start';

    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    updateDisplay();
  }

  function init() {
    document.getElementById('timer-start').addEventListener('click', startTimer);
    document.getElementById('timer-reset').addEventListener('click', resetTimer);

    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setMode(btn.dataset.mode, parseInt(btn.dataset.time));
      });
    });

    updateDisplay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
