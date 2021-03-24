declare interface Window {
    electron: {
        startTimer: (duration: number) => void,
        onTick: (func: Function) => void
    }
}

const timerLabel = document.getElementById('timer')
const startTimerButton = document.getElementById('start-timer-button')
const workDurationInput = document.getElementById('work-duration-input') as HTMLInputElement
const breakDurationInput = document.getElementById('break-duration-input') as HTMLInputElement

// Set input values from localStorage
if (localStorage.workTimeDuration) workDurationInput.value = localStorage.workTimeDuration
if (localStorage.breakTimeDuration) breakDurationInput.value = localStorage.breakTimeDuration

// Save work and break time durations in localStorage
workDurationInput.onchange = () => localStorage.workTimeDuration = workDurationInput.value
breakDurationInput.onchange = () => localStorage.breakTimeDuration = breakDurationInput.value

/**
 * Receives timer data on every timer tick and updates timer label
 */
window.electron.onTick((minutes: number, seconds: number) => {
    timerLabel.innerHTML = `${minutes < 10 ? '0' + minutes : minutes
        }:${seconds < 10 ? '0' + seconds : seconds}`
})

startTimerButton.onclick = () => window.electron.startTimer((localStorage.workTimeDuration || 20) * 60)
