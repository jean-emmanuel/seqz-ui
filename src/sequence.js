/*
 * Sequence: a single osc address with different values over time
 *
 */

const engine = require('./engine')
let  Sequencer


class Sequence {

    constructor(pattern, id, options) {

        this.parent = pattern

        this.id = id

        this.address = options.address
        this.type = options.type
        this.note = options.note
        this.values = options.values

        this.write()

    }

    path() {

        var id = [this.id],
            parent = this

        Sequencer = require('./sequencer')

        while ((parent = parent.parent) && !(parent instanceof Sequencer)) {
            id.unshift(parent.id)
        }

        return '/' + id.join('/')

    }

    command(cmd) {

        engine.send('/sequence', this.path(), cmd)

    }

    write() {

        engine.send('/sequencer', 'write', {
            id: this.path(),
            length: this.parent.length || 0,
            enabled: this.parent.enabled || false,
            address: this.address || this.path(),
            type: this.type || 'f',
            note: this.note || false,
            values: this.values || {}
        })

    }

}

module.exports = Sequence
