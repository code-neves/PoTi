import { PomodoroMode, PomodoroTimer } from '../timers/PomodoroTimer.js'; // Import PomodoroMode enum
 // Get the instance of PomodoroTimer
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
    settingsExit: HTMLElement | null;
    focusRange_I: HTMLInputElement | null;
    breakRange_I: HTMLInputElement | null;
    tabTitleSwitch: HTMLInputElement | null;
    modeNotificationsSwitch: HTMLInputElement | null;
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
      settingsExit: document.getElementById('settingsExit_B') as HTMLInputElement,
      focusRange_I: document.getElementById('focusRange_I') as HTMLInputElement,
      breakRange_I: document.getElementById('breakRange_I') as HTMLInputElement,
      tabTitleSwitch: document.getElementById('tabTitleSwitch') as HTMLInputElement,
      modeNotificationsSwitch: document.getElementById('modeNotificationsSwitch') as HTMLInputElement,
    };
  }




  public saveSettings() {
    console.log('salvou');
    console.log(localStorage);
    
      localStorage.setItem('focusDuration', this.prop.focusNumber_I.value);
      localStorage.setItem('breakDuration', this.prop.breakNumber_I.value);
      if(this.prop.modeNotificationsSwitch){
        localStorage.setItem('modeNotifications', this.prop.modeNotificationsSwitch.checked.toString());
      }
      if(this.prop.tabTitleSwitch){
        localStorage.setItem('tabTitleTimer', this.prop.tabTitleSwitch.checked.toString());
      }
  }

  public loadSettings() {
    console.log('carregou');
    console.log(localStorage);
    
    
    const savedFocusDuration = localStorage.getItem('focusDuration');
    const savedBreakDuration = localStorage.getItem('breakDuration');
    
    const savedModeNotifications = localStorage.getItem('modeNotifications');
    const savedTabTitleTimer = localStorage.getItem('tabTitleTimer');

    if (savedFocusDuration && this.prop.focusNumber_I && this.prop.focusRange_I){
     this.prop.focusNumber_I.value = savedFocusDuration;
     this.prop.focusRange_I.value = savedFocusDuration;
    }
    if (savedBreakDuration && this.prop.breakNumber_I && this.prop.breakRange_I){
      this.prop.breakNumber_I.value = savedBreakDuration;
      this.prop.breakRange_I.value = savedBreakDuration;
    } 
    if (savedModeNotifications && this.prop.modeNotificationsSwitch) this.prop.modeNotificationsSwitch.checked = JSON.parse(savedModeNotifications);
    if (savedTabTitleTimer && this.prop.tabTitleSwitch) this.prop.tabTitleSwitch.checked = JSON.parse(savedTabTitleTimer);
  }





  public handleModeChange(mode: PomodoroMode) {

    if (this.prop.statusMessage) {
      switch (mode) {
        case PomodoroMode.Focus:
          this.prop.statusMessage.style.visibility = 'visible';
          this.prop.statusMessage.textContent = 'Focus on the task';
          break;
        case PomodoroMode.Break:
          this.prop.statusMessage.style.visibility = 'visible';
          this.prop.statusMessage.textContent = 'Take a break';
          break;
        case PomodoroMode.None:
          this.prop.statusMessage.style.visibility = 'hidden';
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
        break; 
      case PomodoroMode.Break:
        document.body.classList.add('break-mode');
        break;
      case PomodoroMode.None:
        document.body.classList.add('none-mode');
        break;
      default:
        break;
    }

  }

}
