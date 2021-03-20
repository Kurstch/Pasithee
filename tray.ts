import { Tray, Menu } from 'electron'
import * as path from 'path'

export default function createTray() {
    const tray = new Tray(path.join(__dirname, '../icon.png'))
    const menu = Menu.buildFromTemplate([
        { role: 'quit' },
    ])

    tray.setToolTip('Pasithee')
    tray.setContextMenu(menu)

    return tray
}