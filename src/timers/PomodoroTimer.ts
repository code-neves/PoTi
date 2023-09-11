import { log } from "console";



enum PomodoroMode {
  Focus = 'focus',
  Break = 'break',
  Transition = 'transition',
  None = 'none',
}

class PomodoroTimer {
  private workDuration: number;
  private breakDuration: number;
  public actualMode: PomodoroMode;
  private timeRemaining: number;
  private onModeChange: (mode: PomodoroMode) => void;
  public isTimerActive: boolean;
  private timerInterval: NodeJS.Timeout | null = null;
  private formattedTime: string;
  private focusNotificationSound: HTMLAudioElement; // Sound for Focus
  private breakNotificationSound: HTMLAudioElement; // Sound for Break
  
  constructor(
    workMinutes: number,
    breakMinutes: number,
    onModeChange: (mode: PomodoroMode) => void
  ) {
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
  
  private formatTime(timeInMilliseconds: number): string {
    const minutes = Math.floor(timeInMilliseconds / 60000);
    const seconds = ((timeInMilliseconds % 60000) / 1000).toFixed(0);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  private updateFormattedTime() {
    this.formattedTime = this.formatTime(this.timeRemaining);
  }
  private updateTimerDisplay() {
    const timerDisplay = document.getElementById('timerDisplay');
    if (timerDisplay) {
      timerDisplay.textContent = this.formattedTime; // Use the formattedTime property
    }
  }
  
  private tick() {
    this.timeRemaining -= 1000;
    
    if (this.timeRemaining <= 0) {
      if (this.actualMode === PomodoroMode.Focus) {
        // Switch from Focus to Break
        console.log('focando');
        this.actualMode = PomodoroMode.Break;
        this.timeRemaining = this.breakDuration;
        this.playNotificationSound(this.breakNotificationSound); // Play Break notification sound
      } else if(this.actualMode === PomodoroMode.Break) {
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
  
  
  
  
  
  private playNotificationSound(sound?: HTMLAudioElement) {
    if (sound) {
      sound.play();
    }
  }
  
  public start() {
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
        clearInterval(this.timerInterval as NodeJS.Timeout);
      }
    }, 1000);
  }

  public stop() {
    this.isTimerActive = false;
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  public reset() {
    this.stop();
    this.isTimerActive = false;
    this.timeRemaining = this.workDuration;
    this.updateFormattedTime(); 
    this.updateTimerDisplay();
  }

  public getTimerActiveStatus(): boolean {
    return this.isTimerActive;
  }

  public updateDuration(newWorkDuration: number, newBreakDuration: number) {
    this.workDuration = newWorkDuration * 60 * 1000;
    this.breakDuration = newBreakDuration * 60 * 1000;
  
    if (this.actualMode === PomodoroMode.Focus) {
      this.timeRemaining = this.workDuration;
    } else if (this.actualMode === PomodoroMode.Break) {
      this.timeRemaining = this.breakDuration;
    }
  
    // Update the formatted time with the new timeRemaining value
    this.updateFormattedTime();
  
    this.updateTimerDisplay();
  }
}

export { PomodoroTimer, PomodoroMode };