const Column = require('./column'),
      Set = require('./set'),
      engine = require('../engine')

class SequencerPanel {

    constructor() {

        this.activeSet = 0

        this.leftPanel = document.getElementById('set-list')
        this.rightPanel = document.getElementById('sequencer-container')
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
        this.leftPanel.innerHTML = ''
        for (let sdata of engine.sets) {
            var set = new Set(this, sdata)
            if (this.activeSet == set.id) set.activate()
            this.leftPanel.appendChild(set.html)
        }


        // current set columns
        this.rightPanel.innerHTML = ''
        this.columns = []

        var set = engine.sets[this.activeSet]
        if (!set) return

        for (let cdata of set.columns) {

            var column = new Column(this, cdata)

            this.columns.push(column)
            this.rightPanel.appendChild(column.html)

        }


    }


}

module.exports = new SequencerPanel()
