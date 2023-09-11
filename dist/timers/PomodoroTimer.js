var PomodoroMode;
(function (PomodoroMode) {
    PomodoroMode["Focus"] = "focus";
    PomodoroMode["Break"] = "break";
    PomodoroMode["Transition"] = "transition";
    PomodoroMode["None"] = "none";
})(PomodoroMode || (PomodoroMode = {}));
class PomodoroTimer {
    constructor(workMinutes, breakMinutes, onModeChange) {
        this.timerInterval = null;
        this.workDuration = workMinutes * 60 * 1000;
        this.breakDuration = breakMinutes * 60 * 1000;
        this.actualMode = PomodoroMode.Focus;
        this.timeRemaining = this.workDuration;
        this.onModeChange = onModeChange; // Assign the callback function passed as an argument
        this.isTimerActive = false;
        this.formattedTime = this.formatTime(this.timeRemaining);
        this.focusNotificationSound = new Audio('./assets/audio/focusnoti.mp3'); // Replace 'focus_notification.mp3' with Focus sound file
        this.breakNotificationSound = new Audio('./assets/audio/breaknoti.mp3'); // Replace 'break_notification.mp3' with Break sound file
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
            timerDisplay.textContent = this.formattedTime; // Use the formattedTime property
        }
    }
    tick() {
        this.timeRemaining -= 1000;
        if (this.timeRemaining <= 0) {
            if (this.actualMode === PomodoroMode.Focus) {
                // Switch from Focus to Break
                console.log('focando');
                this.actualMode = PomodoroMode.Break;
                this.timeRemaining = this.breakDuration;
                this.playNotificationSound(this.breakNotificationSound); // Play Break notification sound
            }
            else if (this.actualMode === PomodoroMode.Break) {
                console.log('brekando');
                this.actualMode = PomodoroMode.Focus;
                this.timeRemaining = this.workDuration;
                this.playNotificationSound(this.focusNotificationSound); // Play Focus notification sound
            }
            this.playNotificationSound();
            // Use the existing method to update the background color
            this.onModeChange(this.actualMode);
            // Add console.log for debugging
            console.log('Mode changed to:', this.actualMode);
        }
        // Update the formatted time
        this.updateFormattedTime();
        // Update the document title with mode and time remaining
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
        // Initialize the timer interval
        this.timerInterval = setInterval(() => {
            this.tick();
            if (!this.isTimerActive) {
                clearInterval(this.timerInterval);
            }
        }, 1000);
    }
    stop() {
        this.isTimerActive = false;
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
        // Update the formatted time with the new timeRemaining value
        this.updateFormattedTime();
        this.updateTimerDisplay();
    }
}
export { PomodoroTimer, PomodoroMode };
