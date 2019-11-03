const html = require('nanohtml')
const cursorColor = window.getComputedStyle(document.documentElement).getPropertyValue('--color-active')

class Pattern {

    constructor(column, data) {

        this.parent = column

        this.html = html`
            <div class="pattern">
                <div class="title"></div>
                <canvas class="preview">
                </canvas>
            </div>
        `
        this.title = this.html.getElementsByClassName('title')[0]
        this.preview = this.html.getElementsByClassName('preview')[0]
        this.preview.height = 44
        this.preview.width = 120
        this.ctx = this.preview.getContext('2d', {
            singleBuffered: true,
            lowLatency: true,
            desynchronized: true,
            alpha: true
        })
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = cursorColor

        this.empty = !data

        this.html.classList.toggle('empty', this.empty)

        if (!this.empty) {

            this.title.innerHTML = `${data.id}: ${data.label}`

            this.length = data.length
            this.enabled = data.enabled

            this.html.classList.toggle('enabled', this.enabled)

        }

    }

    updateCursor(cursor) {

        if (this.empty) return

        var x = Math.round(this.preview.width * (cursor % this.length) / this.length)

        this.ctx.clearRect(0,0,this.preview.width, this.preview.height)

        this.ctx.beginPath()
        this.ctx.moveTo(x, 0)
        this.ctx.lineTo(x, this.preview.height)
        this.ctx.stroke()

    }

}

module.exports = Pattern
