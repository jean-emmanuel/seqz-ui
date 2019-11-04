const Column = require('./column'),
      Set = require('./set'),
      engine = require('../engine')

class SequencerPanel {

    constructor() {

        this.activeSet = 0

        this.leftPanel = document.getElementById('set-list')
        this.rightPanel = document.getElementById('sequencer-container')

        this.sets = []
        this.columns = []

        this.build()

    }

    update() {

        if (engine.hasChanged()) this.build()

        var cursor = engine.cursor
        for (var column of this.columns) {
            column.updateCursors(cursor)
        }

    }

    build() {

        // set list
        this.activeSet = engine.activeSet

        var sets = JSON.parse(engine.strSets).sets

        for (var i = 0; i < sets.length; i++) {
            let sdata = sets[i]
            if (this.sets[i]) {
                this.sets[i].updateData(sdata)
            } else {
                this.sets[i] = new Set(this, sdata)
                this.leftPanel.appendChild(this.sets[i].html)
            }
            this.sets[i].toggle(this.activeSet == this.sets[i].id)
        }



        // current set columns

        var set = sets[this.activeSet]
        if (!set) return

        for (var i = this.columns.length - 1; i >= set.columns.length; i--) {
            this.columns.splice(i, 1)
            this.rightPanel.removeChild(this.rightPanel.children[i])
        }

        for (var i = 0; i < set.columns.length; i++) {
            let cdata = set.columns[i]
            if (this.columns[i]) {
                this.columns[i].updateData(cdata)
            } else {
                this.columns[i] = new Column(this, cdata)
                this.rightPanel.appendChild(this.columns[i].html)
            }
        }


    }


}

module.exports = new SequencerPanel()
