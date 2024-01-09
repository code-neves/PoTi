
import { PomodoroTimer, PomodoroMode } from './timers/PomodoroTimer.js';
import { PomodoroUIManager } from './ui/UiManager.js';

const UI = new PomodoroUIManager();
UI.loadSettings();

let focusDuration = 22;
let breakDuration = 5;

if (localStorage) {
  const storedFocusDuration = localStorage.getItem('focusDuration');
  const storedBreakDuration = localStorage.getItem('breakDuration');
  
  if (storedFocusDuration && storedBreakDuration) {
    focusDuration = parseInt(storedFocusDuration);
    breakDuration = parseInt(storedBreakDuration);
  }
}

const pomodoro = new PomodoroTimer(focusDuration, breakDuration, (mode) => {
  UI.handleModeChange(mode);
});
pomodoro.updateTimerDisplay();
console.log(pomodoro.modeNotifications);

function updateDuration() {
  if (!pomodoro.isTimerActive) {
    const newWorkDuration = parseInt(UI.prop.focusNumber_I.value, 10);
    const newBreakDuration = parseInt(UI.prop.breakNumber_I.value, 10);

    if (!isNaN(newWorkDuration) && !isNaN(newBreakDuration)) {
      pomodoro.updateDuration(newWorkDuration, newBreakDuration);
    }
  }
}

if (UI.prop.updateDurationButton) {
  UI.prop.updateDurationButton.addEventListener('click', updateDuration);
}

if (UI.prop.timerDisplay) {
  UI.prop.timerDisplay?.addEventListener('click', () => {

    if (pomodoro.isTimerActive) {
      pomodoro.Pause();
      UI.handleModeChange(PomodoroMode.None);
      UI.prop.start_B ? UI.prop.start_B.disabled = false : null;
      UI.prop.stop_B ? UI.prop.stop_B.disabled = true : null;
      UI.prop.stop_B ? UI.prop.stop_B.classList.remove('hover') : null;
    } else if (!pomodoro.isTimerActive) {
      pomodoro.startTick();
      UI.prop.start_B ? UI.prop.start_B.classList.remove('hover') : null;
      UI.handleModeChange(pomodoro.actualMode);
      UI.prop.start_B ? UI.prop.start_B.disabled = true : null;
      UI.prop.stop_B ? UI.prop.stop_B.disabled = false : null;
      UI.prop.reset_B ? UI.prop.reset_B.disabled = false : null;
    }
  });
  UI.prop.timerDisplay?.addEventListener('mouseover', () => {
    if (pomodoro.isTimerActive) {
      UI.prop.stop_B ? UI.prop.stop_B.classList.add('hover') : null;
    } else if (!pomodoro.isTimerActive) {
      UI.prop.start_B ? UI.prop.start_B.classList.add('hover') : null;
    }
  });
  UI.prop.timerDisplay?.addEventListener('mouseleave', () => {

    UI.prop.stop_B ? UI.prop.stop_B.classList.remove('hover') : null;
    UI.prop.start_B ? UI.prop.start_B.classList.remove('hover') : null;

  });
}

if (UI.prop.start_B) {
  UI.prop.start_B.addEventListener('click', () => {
    pomodoro.startTick();
    UI.handleModeChange(pomodoro.actualMode);
    
  });
}

if (UI.prop.stop_B) {
  UI.prop.stop_B.addEventListener('click', () => {
    pomodoro.Pause();
    UI.handleModeChange(PomodoroMode.None);
    
  });
}

if (UI.prop.reset_B) {
  UI.prop.reset_B.addEventListener('click', () => {
    pomodoro.ResetAndPause();
    UI.handleModeChange(PomodoroMode.None);

    
  });
}



if (UI.prop.settingsGear) {
  UI.prop.settingsGear.addEventListener('click', () => {
    if (UI.prop.settingsBg?.classList.contains('open')) {
      UI.prop.settingsBg ? UI.prop.settingsBg.classList.remove('open') : null;
      if (pomodoro.isTimerActive){pomodoro.startTick()}
      


    } else if (!UI.prop.settingsBg?.classList.contains('open')) {
      UI.prop.settingsBg ? UI.prop.settingsBg.classList.add('open') : null;
      UI.handleModeChange(PomodoroMode.None);
      pomodoro.Pause()
    }

  });
  if (UI.prop.settingsExit) {
    UI.prop.settingsExit.addEventListener('click', () => {
      console.log('iu');
      
      UI.prop.settingsBg ? UI.prop.settingsBg.classList.remove('open') : null;
      if (pomodoro.isTimerActive){pomodoro.startTick()}
    });
  }

  if (UI.prop.updateDurationButton) {
    UI.prop.updateDurationButton.addEventListener('click', () => {
      UI.prop.settingsBg ? UI.prop.settingsBg.classList.remove('open') : null;
      pomodoro.ResetAndPause()
      UI.saveSettings()
    });
  }
}


if (UI.prop.focusNumber_I && UI.prop.focusRange_I) { 
  UI.prop.focusNumber_I.value = UI.prop.focusRange_I.value; }
if (UI.prop.focusRange_I) {
  UI.prop.focusRange_I.addEventListener("input", (event: any) => {
    UI.prop.focusNumber_I.value = event.target.value;
    
  });
}

if (UI.prop.breakNumber_I && UI.prop.breakRange_I) { 
  UI.prop.breakNumber_I.value = UI.prop.breakRange_I.value; }
if (UI.prop.breakRange_I) {
  UI.prop.breakRange_I.addEventListener("input", (event: any) => {
    UI.prop.breakNumber_I.value = event.target.value;
    
  });
}

if (UI.prop.modeNotificationsSwitch) {
  addEventListener('click', () => {
    if (UI.prop.modeNotificationsSwitch?.checked) {
       pomodoro.modeNotifications = true;
    } else if (!UI.prop.modeNotificationsSwitch?.checked) {
       pomodoro.modeNotifications = false;
    }
  }
  );
}
if (UI.prop.tabTitleSwitch) {
  addEventListener('click', () => {
    if (UI.prop.tabTitleSwitch?.checked) {
      pomodoro.tabTitleTimer = true;
    } else if (!UI.prop.tabTitleSwitch?.checked) {
      pomodoro.tabTitleTimer = false;
    }
  }
  );
}

