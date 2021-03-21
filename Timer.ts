export default class Timer {
    interval: NodeJS.Timeout
    minutes: number
    seconds: number
    diff: number

    onTick: (minutes: number, seconds: number, diff: number) => void
    onDone: () => void

    start(duration: number) {
        this.stop()
        let start = Date.now()

        this.interval = setInterval(() => {
            this.diff = duration - (((Date.now() - start) / 1000) | 0)

            this.minutes = (this.diff / 60) | 0
            this.seconds = (this.diff % 60) | 0

            if (this.diff <= 0) {
                this.stop()
                if (typeof this.onDone === 'function') {
                    this.onDone()
                }
            }

            if (typeof this.onTick === 'function') {
                this.onTick(this.minutes, this.seconds, this.diff)
            }
        }, 1000)
    }

    stop() {
        clearInterval(this.interval)
    }
}
