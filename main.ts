import { app, ipcMain } from 'electron'
import createWindow from './window'
import createTray from './tray'
import Timer from './Timer'

let top: any = {} // prevent gc to keep windows
const timer = new Timer()

app.once('ready', () => {
    top.window = createWindow()
    top.tray = createTray(top.window)
})

app.on('before-quit', () => {
    // BrowserWindow "close" event spawn after quit operation,
    // it requires to clean up listeners for "close" event
    top.window.removeAllListeners('close')
    // release windows
    top = null
})

timer.onTick = (minutes, seconds, diff) => {
    top.window.webContents.send('timer-tick', minutes, seconds, diff)
}

ipcMain.on('start-timer', (event, duration) => timer.start(duration))
