(function() {
  'use strict';

  let timerInterval = null;
  let timeLeft = 25 * 60;
  let totalTime = 25 * 60;
  let isRunning = false;
  let currentMode = 'work';
  let sessions = 0;
  let totalMinutes = 0;
  let endTime = null;

  function saveState() {
    try {
      sessionStorage.setItem('dk-pomodoro', JSON.stringify({
        sessions: sessions,
        totalMinutes: totalMinutes,
        currentMode: currentMode,
        timeLeft: timeLeft,
        totalTime: totalTime,
        isRunning: isRunning,
        endTime: endTime
      }));
    } catch (e) {}
  }

  function loadState() {
    try {
      const saved = sessionStorage.getItem('dk-pomodoro');
      if (saved) {
        const state = JSON.parse(saved);
        sessions = state.sessions || 0;
        totalMinutes = state.totalMinutes || 0;
        currentMode = state.currentMode || 'work';
        timeLeft = state.timeLeft || 25 * 60;
        totalTime = state.totalTime || 25 * 60;
        endTime = state.endTime || null;

        if (state.isRunning && state.endTime && state.endTime > Date.now()) {
          timeLeft = Math.floor((state.endTime - Date.now()) / 1000);
          isRunning = true;
          document.getElementById('timer-start').textContent = 'Pause';
          startInterval();
        } else {
          isRunning = false;
          document.getElementById('timer-start').textContent = 'Start';
        }

        document.querySelectorAll('.mode-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.mode === currentMode);
        });

        updateDisplay();
        return true;
      }
    } catch (e) {}
    return false;
  }

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

  function startInterval() {
    endTime = Date.now() + timeLeft * 1000;
    saveState();

    timerInterval = setInterval(() => {
      timeLeft--;
      updateDisplay();
      saveState();

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        endTime = null;
        document.getElementById('timer-start').textContent = 'Start';

        if (currentMode === 'work') {
          sessions++;
          totalMinutes += Math.round(totalTime / 60);
        }

        updateDisplay();
        saveState();
        try {
          new Audio('data:audio/wav;base64,UklGRl9vT19teleXQBAABAAEARAAEQACABAAEABkYXRhQe8AAH//f/9//3//').play().catch(() => {});
        } catch (e) {}

        alert(currentMode === 'work' ? 'Work session complete! Take a break.' : 'Break over! Ready to work?');
      }
    }, 1000);
  }

  function startTimer() {
    if (isRunning) {
      clearInterval(timerInterval);
      isRunning = false;
      endTime = null;
      document.getElementById('timer-start').textContent = 'Start';
      saveState();
      return;
    }

    isRunning = true;
    document.getElementById('timer-start').textContent = 'Pause';
    startInterval();
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    endTime = null;
    timeLeft = totalTime;
    document.getElementById('timer-start').textContent = 'Start';
    updateDisplay();
    saveState();
  }

  function setMode(mode, minutes) {
    clearInterval(timerInterval);
    isRunning = false;
    endTime = null;
    currentMode = mode;
    totalTime = minutes * 60;
    timeLeft = totalTime;
    document.getElementById('timer-start').textContent = 'Start';

    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    updateDisplay();
    saveState();
  }

  function init() {
    document.getElementById('timer-start').addEventListener('click', startTimer);
    document.getElementById('timer-reset').addEventListener('click', resetTimer);

    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setMode(btn.dataset.mode, parseInt(btn.dataset.time));
      });
    });

    if (!loadState()) {
      updateDisplay();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
