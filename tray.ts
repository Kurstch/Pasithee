import { Tray, Menu, BrowserWindow } from 'electron'
import * as path from 'path'

export default function createTray(window: BrowserWindow) {
    const tray = new Tray(path.join(__dirname, '../icon.png'))
    const menu = Menu.buildFromTemplate([
        { role: 'quit' },
    ])

    tray.setToolTip('Pasithee')
    tray.setContextMenu(menu)
    tray.on('click', () => {
        window.show()
    })

    return tray
}