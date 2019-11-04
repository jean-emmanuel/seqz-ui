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
        this.updateData(data)

    }

    updateData(data){

        this.data = data

        if (this.data) {

            this.title.innerHTML = `${data.id}: ${data.label}`

            for (var i = this.patterns.length - 1; i >= data.patterns.length; i--) {
                this.patterns.splice(i, 1)
                this.wrapper.removeChild(this.wrapper.children[i])
            }

            for (var i = 0; i < data.patterns.length; i++) {
                let pdata = data.patterns[i]
                if (this.patterns[i]) {
                    this.patterns[i].updateData(pdata)
                } else {
                    this.patterns[i] = new Pattern(this, pdata)
                    this.wrapper.appendChild(this.patterns[i].html)
                }
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
