"use strict";
/* import { log } from "console";

class Timer {
  private duration: number;
  private timerInterval: NodeJS.Timeout | null = null;
  private callback: () => void;

  constructor(durationMinutes: number, callback: () => void) {
    this.duration = durationMinutes * 60 * 1000;
    this.callback = callback;
  }

  private startTimer() {
    if (this.timerInterval === null){
      this.timerInterval = setInterval(() => {
        this.callback();
        this.stop();
      }, this.duration);
    }
  }


  public stop() {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    console.log('aobinha');
    
  }

  public reset() {
    this.stop();
    console.log('aoba');
    
  }
}

export { Timer };
 */ 
