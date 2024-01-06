import { PomodoroMode } from '../timers/PomodoroTimer.js'; // Import PomodoroMode enum

export class PomodoroUIManager {
  public prop: {
    focusNumber_I: HTMLInputElement;
    breakNumber_I: HTMLInputElement;
    updateDurationButton: HTMLElement;
    start_B: HTMLButtonElement | null;
    stop_B: HTMLButtonElement | null;
    reset_B: HTMLButtonElement | null;
    timerDisplay: HTMLElement | null;
    statusMessage: HTMLElement | null;
    settingsBg: HTMLElement | null;
    settingsMenu: HTMLElement | null;
    settingsGear: HTMLElement | null;
    focusRange_I: HTMLInputElement | null;
    breakRange_I: HTMLInputElement | null;
  };

  constructor() {
    this.prop = {
      stop_B: document.getElementById('stop_B') as HTMLButtonElement,
      start_B: document.getElementById('start_B') as HTMLButtonElement,
      reset_B: document.getElementById('reset_B') as HTMLButtonElement,
      timerDisplay: document.getElementById('timerDisplay') as HTMLInputElement,
      focusNumber_I: document.getElementById('focusNumber_I') as HTMLInputElement,
      breakNumber_I: document.getElementById('breakNumber_I') as HTMLInputElement,
      updateDurationButton: document.getElementById('updateDuration') as HTMLInputElement,
      statusMessage: document.getElementById('statusMessage') as HTMLInputElement,
      settingsBg: document.getElementById('settings-bg') as HTMLInputElement,
      settingsMenu: document.getElementById('settings-menu') as HTMLInputElement,
      settingsGear: document.getElementById('settingsGear_B') as HTMLInputElement,
      focusRange_I: document.getElementById('focusRange_I') as HTMLInputElement,
      breakRange_I: document.getElementById('breakRange_I') as HTMLInputElement,
    }; 
  }

  public handleModeChange(mode: PomodoroMode) {
    
    if (this.prop.statusMessage) {
      switch (mode) {
        case PomodoroMode.Focus:
          this.prop.statusMessage.textContent = 'Focus on the task';
          break;
        case PomodoroMode.Break:
          this.prop.statusMessage.textContent = 'Take a break';
          break;
        case PomodoroMode.None:
          this.prop.statusMessage.textContent = 'Timer paused';
          break;
      }
    }
    updateBackgroundColor(mode);
  }
}

export function updateBackgroundColor(mode: PomodoroMode) {
  const main = document.querySelector('main');
  if (document.body && main) {
    document.body.classList.remove('focus-mode', 'break-mode', 'transition-mode', 'none-mode');
    
    switch (mode) {
      case PomodoroMode.Focus:
        document.body.classList.add('focus-mode');
        main.style.backgroundImage = 'url(../assets/bg-overlay.png)';
        break;
      case PomodoroMode.Break:
        document.body.classList.add('break-mode');
        main.style.backgroundImage = 'none';
        break;
      case PomodoroMode.None:
        document.body.classList.add('none-mode');
        break;
      default:
        break;
    }
  } 
}