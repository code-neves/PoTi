import { PomodoroMode } from '../timers/PomodoroTimer.js'; // Import PomodoroMode enum
// Get the instance of PomodoroTimer
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
            settingsExit: document.getElementById('settingsExit_B'),
            focusRange_I: document.getElementById('focusRange_I'),
            breakRange_I: document.getElementById('breakRange_I'),
            tabTitleSwitch: document.getElementById('tabTitleSwitch'),
            modeNotificationsSwitch: document.getElementById('modeNotificationsSwitch'),
        };
    }
    saveSettings() {
        console.log('salvou');
        console.log(localStorage);
        localStorage.setItem('focusDuration', this.prop.focusNumber_I.value);
        localStorage.setItem('breakDuration', this.prop.breakNumber_I.value);
        if (this.prop.modeNotificationsSwitch) {
            localStorage.setItem('modeNotifications', this.prop.modeNotificationsSwitch.checked.toString());
        }
        if (this.prop.tabTitleSwitch) {
            localStorage.setItem('tabTitleTimer', this.prop.tabTitleSwitch.checked.toString());
        }
    }
    loadSettings() {
        console.log('carregou');
        console.log(localStorage);
        const savedFocusDuration = localStorage.getItem('focusDuration');
        const savedBreakDuration = localStorage.getItem('breakDuration');
        const savedModeNotifications = localStorage.getItem('modeNotifications');
        const savedTabTitleTimer = localStorage.getItem('tabTitleTimer');
        if (savedFocusDuration && this.prop.focusNumber_I && this.prop.focusRange_I) {
            this.prop.focusNumber_I.value = savedFocusDuration;
            this.prop.focusRange_I.value = savedFocusDuration;
        }
        if (savedBreakDuration && this.prop.breakNumber_I && this.prop.breakRange_I) {
            this.prop.breakNumber_I.value = savedBreakDuration;
            this.prop.breakRange_I.value = savedBreakDuration;
        }
        if (savedModeNotifications && this.prop.modeNotificationsSwitch)
            this.prop.modeNotificationsSwitch.checked = JSON.parse(savedModeNotifications);
        if (savedTabTitleTimer && this.prop.tabTitleSwitch)
            this.prop.tabTitleSwitch.checked = JSON.parse(savedTabTitleTimer);
    }
    handleModeChange(mode) {
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
export function updateBackgroundColor(mode) {
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
