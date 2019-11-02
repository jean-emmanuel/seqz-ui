const html = require('nanohtml')

class Pattern {

    constructor(column, data) {

        this.parent = column

        this.html = html`
            <div class="pattern">
                <div class="title"></div>
                <div class="preview">
                    <div class="cursor"></div>
                </div>
            </div>
        `
        this.title = this.html.getElementsByClassName('title')[0]
        this.preview = this.html.getElementsByClassName('preview')[0]
        this.cursor = this.html.getElementsByClassName('cursor')[0]

        this.empty = !data

        if (!this.empty) {

            this.title.innerHTML = data.id

            this.length = data.length
            this.enabled = data.enabled

            if (this.enabled) {
                this.html.classList.add('enabled')
            }

        } else {

            this.html.classList.add('empty')

        }

    }

    updateCursor(cursor) {

        if (this.empty) return

        var percent = Math.round(100 * (cursor % this.length) / this.length)
        this.cursor.style.transform = 'translate3d('+ percent +'%,0,0)'

    }

}

module.exports = Pattern
