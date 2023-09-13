class Timer {
    constructor(durationMinutes, callback) {
        this.timerInterval = null;
        this.duration = durationMinutes * 60 * 1000;
        this.callback = callback;
    }
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.callback();
            this.stop();
        }, this.duration);
    }
    start() {
        if (this.timerInterval === null) {
            this.startTimer();
        }
    }
    stop() {
        if (this.timerInterval !== null) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    reset() {
        this.stop();
    }
}
export { Timer };
