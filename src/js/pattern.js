/*
 * Pattern: a group of sequences of the same length
 *
 */

const Sequence = require('./sequence')

class Pattern {

    constructor(column, id, options) {

        this.parent = column

        this.id = id
        this.length = options.length || 0
        this.enabled = options.enabled || false

        this.sequences = []

        if (options.sequences) {
            for (var i in options.sequences) {
                if (!options.sequences[i]) {
                    this.sequences[i] = null
                } else {
                    this.addSequence(i, options.sequences[i])
                }
            }
        }

    }

    enable() {

        this.enabled = true
        for (var s of this.sequences) {
            if (s) s.command('enable')
        }

        this.changed()

    }

    disable() {

        this.enabled = false
        for (var s of this.sequences) {
            if (s) s.command('disable')
        }

        this.changed()

    }

    remove() {

        for (var s of this.sequences) {
            if (s) s.command('remove')
        }
        this.sequences = []

    }

    addSequence(i, options={}) {

        this.sequences[i] = new Sequence(this, i, options)

    }

    removeSequence(i) {

        if (this.sequences[i]) {

            this.sequences[i].command('remove')
            this.sequences[i] = null

        }

    }

    changed() {

        this.parent.changed()

    }

}

module.exports = Pattern
