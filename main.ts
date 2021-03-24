import { app, ipcMain } from 'electron'
import createWindow from './window'
import createTray from './tray'
import Timer from './Timer'

let top: any = {} // prevent gc to keep windows
let breakTime = false // track wether the timer runs for break time or work time
const timer = new Timer()

app.once('ready', () => {
    top.window = createWindow()
    top.tray = createTray(top.window)
})

app.on('before-quit', () => {
    // BrowserWindow "close" event spawn after quit operation,
    // it requires to clean up listeners for "close" event
    top.window.closable = true // prevents error that occurs if window.closable = false
    top.window.removeAllListeners('close')
    // release windows
    top = null
})

timer.onTick = (minutes, seconds, diff) => {
    top.window.webContents.send('timer-tick', minutes, seconds, diff)
}

timer.onDone = () => {
    // break time done
    if (breakTime) {
        top.window.minimizable = true
        top.window.closable = true
    }
    // work time done, start break timer
    else {
        top.window.minimizable = false
        top.window.closable = false
        top.window.show()
        // Attempt to get break time duration from localStorage and start break timer
        top.window.webContents
            .executeJavaScript('localStorage.breakTimeDuration', true)
            .then((duration: number) => timer.start((duration || 10) * 60))
    }
    breakTime = !breakTime
}

ipcMain.on('start-timer', (event, duration) => {
    if (breakTime) {
        top.window.minimizable = true
        top.window.closable = true
        breakTime = false
    }
    timer.start(duration)
})
