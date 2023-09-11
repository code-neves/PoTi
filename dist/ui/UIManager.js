import { PomodoroMode } from '../timers/PomodoroTimer.js'; // Import PomodoroMode enum
export class PomodoroUIManager {
    constructor() {
        this.elements = {
            stopButton: document.getElementById('stopButton'),
            startButton: document.getElementById('startButton'),
            resetButton: document.getElementById('resetButton'),
            timerDisplay: document.getElementById('timerDisplay'),
            workDurationInput: document.getElementById('workDurationInput'),
            breakDurationInput: document.getElementById('breakDurationInput'),
            updateDurationButton: document.getElementById('updateDuration'),
        };
    }
    // Add the handleModeChange method to handle mode changes in the UI
    handleModeChange(mode) {
        const statusMessage = document.getElementById('statusMessage');
        if (statusMessage) {
            switch (mode) {
                case PomodoroMode.Focus:
                    statusMessage.textContent = 'Focus on the task';
                    break;
                case PomodoroMode.Break:
                    statusMessage.textContent = 'Take a break';
                    break;
                case PomodoroMode.None:
                    statusMessage.textContent = 'Click to start';
                    break;
            }
        }
    }
}
