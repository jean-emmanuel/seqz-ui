/*
 * Column: a group of patterns
 *
 */

const engine = require('./engine'),
      Pattern = require('./pattern')

class Column {

    constructor(sequencer, id, options) {

        this.parent = sequencer

        this.id = id
        this.patterns = []

        if (options.patterns) {
            for (var i in options.patterns) {
                if (!options.patterns[i]) {
                    this.patterns[i] = null
                } else {
                    this.addPattern(i, options.patterns[i])
                }
            }
        }

    }

    remove() {


        for (var p of this.patterns) {
            if (p) p.remove()
        }
        this.patterns = []

    }

    addPattern(i, options={}) {

        this.patterns[i] = new Pattern(this, i, options)

    }

    removePattern(i) {

        if (this.patterns[i]) {

            this.patterns[i].remove()
            this.patterns[i] = null

        }

    }

}

module.exports = Column
