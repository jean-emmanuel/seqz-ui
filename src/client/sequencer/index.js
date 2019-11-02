const Column = require('./column')

class SequencerPanel {

    constructor(seq) {

        this.seq = seq
        this.set = 0

        this.html = document.getElementById('sequencer-container')
        this.columns = []

        this.build()

    }

    update() {

        if (this.seq.hasChanged()) this.build()

        var cursor = this.seq.cursor
        for (var column of this.columns) {
            column.updateCursors(cursor)
        }

    }

    build() {

        this.html.innerHTML = ''
        this.columns = []


        var set = this.seq.sets[this.set]
        if (!set) return

        for (let cdata of set.columns) {

            var column = new Column(this, cdata)

            this.columns.push(column)
            this.html.appendChild(column.html)

        }

    }


}

module.exports = SequencerPanel
