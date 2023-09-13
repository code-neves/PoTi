import { PomodoroTimer, PomodoroMode } from './timers/PomodoroTimer.js';
import { PomodoroUIManager } from './ui/UiManager.js';

const uiManager = new PomodoroUIManager();

const workDurationInput = document.getElementById('workDurationInput') as HTMLInputElement;
const breakDurationInput = document.getElementById('breakDurationInput') as HTMLInputElement;
const updateDurationButton = document.getElementById('updateDuration');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const timerDisplay = document.getElementById('timerDisplay');


function updateBackgroundColor(mode: PomodoroMode) {
  const bgBody = document.querySelector('body');
  if (bgBody) {
    bgBody.classList.remove('focus-mode', 'break-mode', 'transition-mode', 'none-mode');

    switch (mode) {
      case PomodoroMode.Focus:
        bgBody.classList.add('focus-mode');
        break;
      case PomodoroMode.Break:
        bgBody.classList.add('break-mode');
        break;
      case PomodoroMode.None:
        break;
      default:
        break;
    }
  }
}


const pomodoro = new PomodoroTimer(25, 5, (mode) => {
  updateBackgroundColor(mode);
  uiManager.handleModeChange(mode);
});


function updateDuration() {
  if (!pomodoro.isTimerActive) {
    const newWorkDuration = parseInt(workDurationInput.value, 10);
    const newBreakDuration = parseInt(breakDurationInput.value, 10);
    
    if (!isNaN(newWorkDuration) && !isNaN(newBreakDuration)) {
      pomodoro.updateDuration(newWorkDuration, newBreakDuration);
      console.log('Updated work duration to', newWorkDuration);
      console.log('Updated break duration to', newBreakDuration);
    }
  }
}


if (updateDurationButton) {
  updateDurationButton.addEventListener('click', updateDuration);
}


if (startButton) {
  startButton.addEventListener('click', () => {
    pomodoro.start();
    updateBackgroundColor(pomodoro.actualMode);
    console.log('Timer started');
    console.log('Start button found');
    
    console.log(pomodoro.isTimerActive);
    const startButton = document.getElementById('startButton') as HTMLButtonElement;
    startButton.disabled = true; 
    console.log('Disabled start button');
  });
}

if (stopButton) {
  stopButton.addEventListener('click', () => {
    pomodoro.stop();
    updateBackgroundColor(PomodoroMode.None);
    
    
    const startButton = document.getElementById('startButton') as HTMLButtonElement;
    startButton.disabled = false;
   
  });
}
if (resetButton) {
    resetButton.addEventListener('click', () => {
    pomodoro.reset();
    updateBackgroundColor(PomodoroMode.None);
    const startButton = document.getElementById('startButton') as HTMLButtonElement;
    startButton.disabled = false;
  });
}



