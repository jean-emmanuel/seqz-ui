/*
 * Sequencer: communicates with the engine
 *
 */

const Engine = require('./engine')

class Sequencer {

    constructor() {


        this.patterns = {}

        this.bpm = 120
        this.cursor = 0
        this.playing = false
        this.bypass = false

        this.engine = new Engine()

        this.engine.on('/status/sequencer', this.update.bind(this))
        this.engine.on('/status/sequence', this.updateSequence.bind(this))

    }

    update(data){

        Object.assign(this, data)

    }

    updateSequence(data){

        var pattern = this.patterns[data.id.split('/')[1]]
        if (pattern) pattern.updateSequence(data)

    }

}

module.exports = Sequencer
