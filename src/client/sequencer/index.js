const Column = require('./column'),
      Set = require('./set')

class SequencerPanel {

    constructor(seq) {

        this.seq = seq
        this.set = 0

        this.leftPanel = document.getElementById('set-list')
        this.rightPanel = document.getElementById('sequencer-container')
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

        // set list
        this.set = this.seq.set
        this.leftPanel.innerHTML = ''
        for (let sdata of this.seq.sets) {
            var set = new Set(this, sdata)
            if (this.set == set.id) set.activate()
            this.leftPanel.appendChild(set.html)
        }


        // current set columns
        this.rightPanel.innerHTML = ''
        this.columns = []

        var set = this.seq.sets[this.set]
        if (!set) return

        for (let cdata of set.columns) {

            var column = new Column(this, cdata)

            this.columns.push(column)
            this.rightPanel.appendChild(column.html)

        }


    }


}

module.exports = SequencerPanel
