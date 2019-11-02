const html = require('nanohtml'),
      Pattern = require('./pattern')

class Column {

    constructor(panel, data) {

        this.parent = panel

        this.html = html`
            <div class="column">
                <div class="title"></div>
                <div class="wrapper"></div>
            </div>
        `
        this.title = this.html.getElementsByClassName('title')[0]
        this.wrapper = this.html.getElementsByClassName('wrapper')[0]

        this.patterns = []

        this.empty = !data

        if (!this.empty) {

            this.title.innerHTML = `${data.id}: ${data.label}`

            for (let pdata of data.patterns) {

                let pattern = new Pattern(this, pdata)
                this.patterns.push(pattern)
                this.wrapper.appendChild(pattern.html)

            }

        }

    }

    updateCursors(cursor) {

        for (var pattern of this.patterns) {

            pattern.updateCursor(cursor)

        }

    }

}

module.exports = Column
