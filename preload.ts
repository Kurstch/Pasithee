import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
    startTimer: (duration: number) => ipcRenderer.send('start-timer', duration),
    /**
     * Calls the given function on every timer tick giving timer data as arguments
     */
    onTick: (func: Function) =>
        ipcRenderer.on('timer-tick', (event, ...args) => func(...args)),
})
