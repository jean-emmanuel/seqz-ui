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
        this.type = options.type || 'f'
        this.note = options.note || false
        this.values = options.values || {}

        if (!Sequencer) Sequencer = require('./sequencer')

        this.write()

    }

    path() {

        var id = [this.id],
            parent = this

        while ((parent = parent.parent) && !(parent instanceof Sequencer)) {
            id.unshift(parent.id)
        }

        return '/' + id.join('/').replace(/\s/g, '_')

    }

    command(cmd) {

        engine.send('/sequence', this.path(), cmd)

    }

    write() {

        engine.send('/sequencer', 'write', {
            id: this.path(),
            length: this.parent.length,
            enabled: this.parent.enabled,
            address: this.address || this.path(),
            type: this.type,
            note: this.note,
            values: this.values
        })

    }

    data() {

        return {
            id: this.id,
            address: this.address,
            type: this.type,
            note: this.note,
            values: this.values,
        }

    }

}

module.exports = Sequence
