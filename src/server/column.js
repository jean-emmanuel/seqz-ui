/*
 * Column: a group of patterns
 *
 */

const engine = require('./engine'),
      Pattern = require('./pattern')

class Column {

    constructor(set, id, options) {

        this.parent = set

        this.id = id
        this.label = options.label || 'Untitled'
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

        this.changed()

    }

    removePattern(i) {

        if (this.patterns[i]) {

            this.patterns[i].remove()
            this.patterns[i] = null

        }

        this.changed()

    }

    changed() {

        this.parent.changed()

    }

    data() {

        return {
            id: this.id,
            label: this.label,
            patterns: this.patterns.map(x=>x?x.data():null),
        }

    }

}

module.exports = Column
