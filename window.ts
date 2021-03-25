import { BrowserWindow } from 'electron'
import * as path from 'path'

export default function createWindow() {
    const window = new BrowserWindow({
        width: 700,
        height: 500,
        center: true,
        autoHideMenuBar: true,
        resizable: false,
        icon: path.join(__dirname, '../icon.png'),
        webPreferences: {
            nodeIntegration: false,
            webSecurity: true,
            contextIsolation: true,
            preload: path.join(__dirname, './preload.js')
        }
    })

    window.loadFile(path.join(__dirname, '../index.html'))

    window.on('close', (event: any) => {
        event.sender.hide() // hide the window
        event.preventDefault() // prevent quit process
    })

    return window
}