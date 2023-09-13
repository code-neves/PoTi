import { PomodoroMode } from '../timers/PomodoroTimer.js'; // Import PomodoroMode enum

export class PomodoroUIManager {
  public elements: {
    workDurationInput: HTMLInputElement;
    breakDurationInput: HTMLInputElement;
    updateDurationButton: HTMLElement;
    startButton: HTMLElement;
    stopButton: HTMLElement;
    resetButton: HTMLElement;
    timerDisplay: HTMLElement;
  };

  constructor() {
    this.elements = {
      stopButton: document.getElementById('stopButton')!,
      startButton: document.getElementById('startButton')!,
      resetButton: document.getElementById('resetButton')!,
      timerDisplay: document.getElementById('timerDisplay')!,
      workDurationInput: document.getElementById('workDurationInput') as HTMLInputElement,
      breakDurationInput: document.getElementById('breakDurationInput') as HTMLInputElement,
      updateDurationButton: document.getElementById('updateDuration')!,
    };
  }

  public handleModeChange(mode: PomodoroMode) {
    const statusMessage = document.getElementById('statusMessage');
    if (statusMessage) {
      switch (mode) {
        case PomodoroMode.Focus:
          statusMessage.textContent = 'Focus on the task';
          break;
        case PomodoroMode.Break:
          statusMessage.textContent = 'Take a break';
          break;
        case PomodoroMode.None:
          statusMessage.textContent = '';
          break;
      }
    }
  }

}
