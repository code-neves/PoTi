
import { PomodoroUIManager } from "../ui/UiManager.js";

const UI = new PomodoroUIManager();

enum PomodoroMode {
  Focus = 'focus',
  Break = 'break',
  None = 'none',
}

class PomodoroTimer {
  private workDuration: number;
  private breakDuration: number;

  private timeRemaining: number;
  private timerInterval: NodeJS.Timeout | null = null;
  private formattedTime: string;
  public isTimerActive: boolean;
  public modeNotifications: boolean;
  public tabTitleTimer: boolean;
  public actualMode: PomodoroMode;
  private onModeChange: (mode: PomodoroMode) => void;

  private focusNotificationSound: HTMLAudioElement;
  private breakNotificationSound: HTMLAudioElement;

  constructor(
    workMinutes: number,
    breakMinutes: number,
    onModeChange: (mode: PomodoroMode) => void
  ) {
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

  
  private tick() {
    this.timeRemaining -= 1000;
    
    if (this.timeRemaining <= 0) {
      if (this.actualMode === PomodoroMode.Focus) {
        
        this.actualMode = PomodoroMode.Break;
        this.timeRemaining = this.breakDuration;
        if (this.modeNotifications){
          this.playNotificationSound(this.breakNotificationSound);
        }
        
      } else if (this.actualMode === PomodoroMode.Break) {

        this.actualMode = PomodoroMode.Focus;
        this.timeRemaining = this.workDuration;
        if (this.modeNotifications){
          this.playNotificationSound(this.focusNotificationSound);
        }
      }
      if(this.modeNotifications){
        this.playNotificationSound();
      }
      this.onModeChange(this.actualMode);

    }

    this.updateFormattedTime();
    this.updateTimerDisplay();
    if (this.tabTitleTimer){
      this.updateTabTitle();
    }
  }
  
  private formatTime(timeInMilliseconds: number): string {
    const minutes = Math.floor(timeInMilliseconds / 60000);
    const seconds = ((timeInMilliseconds % 60000) / 1000).toFixed(0);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  private updateFormattedTime() {
    this.formattedTime = this.formatTime(this.timeRemaining);
  }
  
  public updateTimerDisplay() {
    return UI.prop.timerDisplay? UI.prop.timerDisplay.textContent = this.formattedTime : null;
  }

  private playNotificationSound(sound?: HTMLAudioElement) {
    return sound ? sound.play() : null;
  }

  private updateTabTitle() {
    document.title = `[${this.formattedTime}] ${this.actualMode} - PoTi `;
  }
  private checkForInterval() {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  public startTick() {
    this.updateTimerDisplay();
    this.isTimerActive = true;
    if(this.modeNotifications){
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
        clearInterval(this.timerInterval as NodeJS.Timeout);
      }
    }, 1000);
  }

  public Pause() {
    this.isTimerActive = false;
    this.checkForInterval();
    UI.prop.stop_B ? UI.prop.stop_B.disabled = true : null;
    UI.prop.start_B ? UI.prop.start_B.disabled = false : null;
  }

  public ResetAndPause() {
    this.Pause();
    this.timeRemaining = this.workDuration;
    this.updateFormattedTime();
    this.updateTimerDisplay();
    UI.prop.start_B ? UI.prop.start_B.disabled = false : null;
    UI.prop.reset_B ? UI.prop.reset_B.disabled = true : null;

    document.title = `PoTi`;
    return UI.prop.statusMessage? UI.prop.statusMessage.textContent = 'Timer was reset': null;
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

    this.updateFormattedTime();
    this.updateTimerDisplay();
  }
}

export { PomodoroTimer, PomodoroMode };