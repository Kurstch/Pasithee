import { BrowserWindow } from 'electron'
import * as path from 'path'

export default function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        webPreferences: {
            nodeIntegration: false,
            webSecurity: true,
            contextIsolation: true,
        }
    })

    window.loadFile(path.join(__dirname, 'index.html'))

    window.on('close', (event: any) => {
        event.sender.hide() // hide the window
        event.preventDefault() // prevent quit process
    })

    return window
}