// timers/Timer.ts

class Timer {
  private duration: number;
  private timerInterval: NodeJS.Timeout | null = null;
  private callback: () => void;

  constructor(durationMinutes: number, callback: () => void) {
    this.duration = durationMinutes * 60 * 1000;
    this.callback = callback;
  }

  private startTimer() {
    this.timerInterval = setInterval(() => {
      this.callback();
      this.stop(); // Automatically stop the timer after the callback
    }, this.duration);
  }

  public start() {
    if (this.timerInterval === null) {
      this.startTimer();
    }
  }

  public stop() {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  public reset() {
    this.stop();
  }
}

export { Timer };
