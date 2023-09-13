import { PomodoroTimer, PomodoroMode } from './timers/PomodoroTimer.js';
class PomodoroApp {
    constructor() {
        this.pomodoro = new PomodoroTimer(25, 5, this.handleModeChange.bind(this));
    }
    handleModeChange(mode) {
        const statusMessage = document.getElementById('statusMessage');
        if (statusMessage) {
            switch (mode) {
                case PomodoroMode.Focus:
                    console.log('1');
                    statusMessage.textContent = 'Focus on the task';
                    break;
                case PomodoroMode.Break:
                    console.log('2');
                    statusMessage.textContent = 'Take a break';
                    break;
                case PomodoroMode.None:
                    console.log('3');
                    statusMessage.textContent = 'Click to start';
                    break;
            }
        }
    }
}
const app = new PomodoroApp();
