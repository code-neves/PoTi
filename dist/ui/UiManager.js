import { PomodoroMode } from '../timers/PomodoroTimer.js'; // Import PomodoroMode enum
export class PomodoroUIManager {
    constructor() {
        this.prop = {
            stop_B: document.getElementById('stop_B'),
            start_B: document.getElementById('start_B'),
            reset_B: document.getElementById('reset_B'),
            timerDisplay: document.getElementById('timerDisplay'),
            focusNumber_I: document.getElementById('focusNumber_I'),
            breakNumber_I: document.getElementById('breakNumber_I'),
            updateDurationButton: document.getElementById('updateDuration'),
            statusMessage: document.getElementById('statusMessage'),
            settingsBg: document.getElementById('settings-bg'),
            settingsMenu: document.getElementById('settings-menu'),
            settingsGear: document.getElementById('settingsGear_B'),
            focusRange_I: document.getElementById('focusRange_I'),
            breakRange_I: document.getElementById('breakRange_I'),
        };
    }
    handleModeChange(mode) {
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
export function updateBackgroundColor(mode) {
    const main = document.querySelector('main');
    if (document.body && main) {
        document.body.classList.remove('focus-mode', 'break-mode', 'transition-mode', 'none-mode');
        switch (mode) {
            case PomodoroMode.Focus:
                document.body.classList.add('focus-mode');
                main.style.backgroundImage = 'url(../../assets/bg-overlay.png)';
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
