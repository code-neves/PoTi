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
        this.focusNotificationSound = new Audio('./assets/audio/focusnoti.mp3');
        this.breakNotificationSound = new Audio('./assets/audio/breaknoti.mp3');
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
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            timerDisplay.textContent = this.formattedTime;
        }
    }
    tick() {
        this.timeRemaining -= 1000;
        if (this.timeRemaining <= 0) {
            if (this.actualMode === PomodoroMode.Focus) {
                this.actualMode = PomodoroMode.Break;
                this.timeRemaining = this.breakDuration;
                this.playNotificationSound(this.breakNotificationSound);
            }
            else if (this.actualMode === PomodoroMode.Break) {
                this.actualMode = PomodoroMode.Focus;
                this.timeRemaining = this.workDuration;
                this.playNotificationSound(this.focusNotificationSound);
            }
            this.playNotificationSound();
            this.onModeChange(this.actualMode);
        }
        this.updateFormattedTime();
        document.title = `PoTi - ${this.actualMode} (${this.formattedTime})`;
        this.updateTimerDisplay();
    }
    playNotificationSound(sound) {
        if (sound) {
            sound.play();
        }
    }
    start() {
        this.updateTimerDisplay();
        this.isTimerActive = true;
        this.playNotificationSound(this.focusNotificationSound);
        this.onModeChange(this.actualMode);
        if (this.timerInterval !== null) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.timerInterval = setInterval(() => {
            this.tick();
            if (!this.isTimerActive) {
                clearInterval(this.timerInterval);
            }
        }, 1000);
    }
    stop() {
        this.isTimerActive = false;
        const statusMessage = document.getElementById('statusMessage');
        if (statusMessage) {
            statusMessage.textContent = 'Timer Stopped';
        }
        if (this.timerInterval !== null) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    reset() {
        this.stop();
        this.isTimerActive = false;
        this.timeRemaining = this.workDuration;
        this.updateFormattedTime();
        this.updateTimerDisplay();
        const statusMessage = document.getElementById('statusMessage');
        if (statusMessage) {
            statusMessage.textContent = 'Timer Reset';
        }
        document.title = `PoTi`;
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
