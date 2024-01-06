var _a, _b, _c;
import { PomodoroTimer, PomodoroMode } from './timers/PomodoroTimer.js';
import { PomodoroUIManager } from './ui/UiManager.js';
const UI = new PomodoroUIManager();
const pomodoro = new PomodoroTimer(25, 5, (mode) => {
    UI.handleModeChange(mode);
});
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
    (_a = UI.prop.timerDisplay) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        if (pomodoro.isTimerActive) {
            pomodoro.Pause();
            UI.handleModeChange(PomodoroMode.None);
            UI.prop.start_B ? UI.prop.start_B.disabled = false : null;
            UI.prop.stop_B ? UI.prop.stop_B.disabled = true : null;
            UI.prop.stop_B ? UI.prop.stop_B.classList.remove('hover') : null;
        }
        else if (!pomodoro.isTimerActive) {
            pomodoro.startTick();
            UI.prop.start_B ? UI.prop.start_B.classList.remove('hover') : null;
            UI.handleModeChange(pomodoro.actualMode);
            UI.prop.start_B ? UI.prop.start_B.disabled = true : null;
            UI.prop.stop_B ? UI.prop.stop_B.disabled = false : null;
            UI.prop.reset_B ? UI.prop.reset_B.disabled = false : null;
        }
    });
    (_b = UI.prop.timerDisplay) === null || _b === void 0 ? void 0 : _b.addEventListener('mouseover', () => {
        if (pomodoro.isTimerActive) {
            UI.prop.stop_B ? UI.prop.stop_B.classList.add('hover') : null;
        }
        else if (!pomodoro.isTimerActive) {
            UI.prop.start_B ? UI.prop.start_B.classList.add('hover') : null;
        }
    });
    (_c = UI.prop.timerDisplay) === null || _c === void 0 ? void 0 : _c.addEventListener('mouseleave', () => {
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
        var _a, _b;
        if ((_a = UI.prop.settingsBg) === null || _a === void 0 ? void 0 : _a.classList.contains('open')) {
            UI.prop.settingsBg ? UI.prop.settingsBg.classList.remove('open') : null;
            if (pomodoro.isTimerActive) {
                pomodoro.startTick();
            }
        }
        else if (!((_b = UI.prop.settingsBg) === null || _b === void 0 ? void 0 : _b.classList.contains('open'))) {
            UI.prop.settingsBg ? UI.prop.settingsBg.classList.add('open') : null;
            UI.handleModeChange(PomodoroMode.None);
            pomodoro.Pause();
        }
    });
    if (UI.prop.updateDurationButton) {
        UI.prop.updateDurationButton.addEventListener('click', () => {
            UI.prop.settingsBg ? UI.prop.settingsBg.classList.remove('open') : null;
            pomodoro.ResetAndPause();
        });
    }
}
if (UI.prop.focusNumber_I && UI.prop.focusRange_I) {
    UI.prop.focusNumber_I.value = UI.prop.focusRange_I.value;
}
if (UI.prop.focusRange_I) {
    UI.prop.focusRange_I.addEventListener("input", (event) => {
        UI.prop.focusNumber_I.value = event.target.value;
    });
}
