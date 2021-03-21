declare interface Window {
    electron: {
        startTimer: (duration: number) => void,
        onTick: (func: Function) => void
    }
}

const timerLabel = document.getElementById('timer')
const startTimerButton = document.getElementById('start-timer-button')

/**
 * Receives timer data on every timer tick and updates timer label
 */
window.electron.onTick((minutes: number, seconds: number) => {
    timerLabel.innerHTML = `${minutes < 10 ? '0' + minutes : minutes
        }:${seconds < 10 ? '0' + seconds : seconds}`
})

startTimerButton.onclick = () => window.electron.startTimer(60)
