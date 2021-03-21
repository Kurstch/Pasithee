import { app } from 'electron'
import createWindow from './window'
import createTray from './tray'

let top: any = {} // prevent gc to keep windows

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
