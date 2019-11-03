/*
 * Set: a group of columns
 *
 */

const engine = require('./engine'),
      Column = require('./column')

class Set {

    constructor(sequencer, id, options) {

        this.parent = sequencer

        this.id = id
        this.label = options.label || 'Untitled'
        this.columns = []

        if (options.columns) {
            for (var i in options.columns) {
                if (!options.columns[i]) {
                    this.columns[i] = null
                } else {
                    this.addColumn(i, options.columns[i])
                }
            }
        }

    }

    remove() {


        for (var c of this.columns) {
            if (c) c.remove()
        }
        this.columns = []

    }

    addColumn(i, options={}) {

        this.columns[i] = new Column(this, i, options)

        this.changed()

    }

    removeColumn(i) {

        if (this.columns[i]) {

            this.columns[i].remove()
            this.columns[i] = null

        }

        this.changed()

    }

    changed() {

        this.parent.changed()

    }

}

module.exports = Set
