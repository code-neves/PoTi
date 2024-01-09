import { PomodoroUIManager } from "../ui/UiManager.js";
const UI = new PomodoroUIManager();
var PomodoroMode;
(function (PomodoroMode) {
    PomodoroMode["Focus"] = "focus";
    PomodoroMode["Break"] = "break";
    PomodoroMode["None"] = "none";
})(PomodoroMode || (PomodoroMode = {}));
class PomodoroTimer {
    constructor(workMinutes, breakMinutes, onModeChange) {
        this.timerInterval = null;
        this.workDuration = workMinutes * 60 * 1000;
        this.breakDuration = breakMinutes * 60 * 1000;
        this.actualMode = PomodoroMode.Focus;
        this.timeRemaining = this.workDuration;
        this.onModeChange = onModeChange;
        this.isTimerActive = false;
        this.formattedTime = this.formatTime(this.timeRemaining);
        this.modeNotifications = false;
        this.tabTitleTimer = false;
        this.focusNotificationSound = new Audio('./assets/audio/focusnoti.mp3');
        this.breakNotificationSound = new Audio('./assets/audio/breaknoti.mp3');
    }
    tick() {
        this.timeRemaining -= 1000;
        if (this.timeRemaining <= 0) {
            if (this.actualMode === PomodoroMode.Focus) {
                this.actualMode = PomodoroMode.Break;
                this.timeRemaining = this.breakDuration;
                if (this.modeNotifications) {
                    this.playNotificationSound(this.breakNotificationSound);
                }
            }
            else if (this.actualMode === PomodoroMode.Break) {
                this.actualMode = PomodoroMode.Focus;
                this.timeRemaining = this.workDuration;
                if (this.modeNotifications) {
                    this.playNotificationSound(this.focusNotificationSound);
                }
            }
            if (this.modeNotifications) {
                this.playNotificationSound();
            }
            this.onModeChange(this.actualMode);
        }
        this.updateFormattedTime();
        this.updateTimerDisplay();
        if (this.tabTitleTimer) {
            this.updateTabTitle();
        }
    }
    formatTime(timeInMilliseconds) {
        const minutes = Math.floor(timeInMilliseconds / 60000);
        const seconds = ((timeInMilliseconds % 60000) / 1000).toFixed(0);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    updateFormattedTime() {
        this.formattedTime = this.formatTime(this.timeRemaining);
    }
    updateTimerDisplay() {
        return UI.prop.timerDisplay ? UI.prop.timerDisplay.textContent = this.formattedTime : null;
    }
    playNotificationSound(sound) {
        return sound ? sound.play() : null;
    }
    updateTabTitle() {
        document.title = `[${this.formattedTime}] ${this.actualMode} - PoTi `;
    }
    checkForInterval() {
        if (this.timerInterval !== null) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    startTick() {
        this.updateTimerDisplay();
        this.isTimerActive = true;
        if (this.modeNotifications) {
            this.playNotificationSound(this.focusNotificationSound);
        }
        this.onModeChange(this.actualMode);
        UI.prop.start_B ? UI.prop.start_B.disabled = true : null;
        UI.prop.stop_B ? UI.prop.stop_B.disabled = false : null;
        UI.prop.reset_B ? UI.prop.reset_B.disabled = false : null;
        this.checkForInterval();
        this.timerInterval = setInterval(() => {
            this.tick();
            if (!this.isTimerActive) {
                clearInterval(this.timerInterval);
            }
        }, 1000);
    }
    Pause() {
        this.isTimerActive = false;
        this.checkForInterval();
        UI.prop.stop_B ? UI.prop.stop_B.disabled = true : null;
        UI.prop.start_B ? UI.prop.start_B.disabled = false : null;
    }
    ResetAndPause() {
        this.Pause();
        this.timeRemaining = this.workDuration;
        this.updateFormattedTime();
        this.updateTimerDisplay();
        UI.prop.start_B ? UI.prop.start_B.disabled = false : null;
        UI.prop.reset_B ? UI.prop.reset_B.disabled = true : null;
        document.title = `PoTi`;
        return UI.prop.statusMessage ? UI.prop.statusMessage.textContent = 'Timer was reset' : null;
    }
    getTimerActiveStatus() {
        return this.isTimerActive;
    }
    updateDuration(newWorkDuration, newBreakDuration) {
        this.workDuration = newWorkDuration * 60 * 1000;
        this.breakDuration = newBreakDuration * 60 * 1000;
        if (this.actualMode === PomodoroMode.Focus) {
            this.timeRemaining = this.workDuration;
        }
        else if (this.actualMode === PomodoroMode.Break) {
            this.timeRemaining = this.breakDuration;
        }
        this.updateFormattedTime();
        this.updateTimerDisplay();
    }
}
export { PomodoroTimer, PomodoroMode };
