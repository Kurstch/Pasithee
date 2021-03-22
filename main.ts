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
    if (breakTime) {
        top.window.minimizable = true
        top.window.closable = true
    }
    else {
        top.window.minimizable = false
        top.window.closable = false
        top.window.show()
        timer.start(10) // break timer, temp duration
    }
    breakTime = !breakTime
}

ipcMain.on('start-timer', (event, duration) => {
    if (breakTime) {
        top.window.minimizable = true
        top.window.closable = true
    }
    timer.start(duration)
})
