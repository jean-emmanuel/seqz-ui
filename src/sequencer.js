/*
 * Sequencer: communicates with the engine
 *
 */

const engine = require('./engine'),
      EventEmitter = require('events'),
      Column = require('./column')


class Sequencer extends EventEmitter {

    constructor() {

        super()

        this.columns = []

        this.bpm = 120
        this.cursor = 0
        this.playing = false
        this.bypass = false

        engine.start()
        engine.on('/status/sequencer', this.update.bind(this))
        engine.once('/status/sequencer', ()=>{
            this.emit('ready')
        })
        // engine.on('/status/sequence', console.log)

    }

    command(cmd, ...args) {

        engine.send('/sequencer', cmd, ...args)

    }

    update(data){

        this.bpm = data.bpm
        this.cursor = data.cursor
        this.playing = data.playing
        this.bypass = data.bypass

        this.emit('update')

    }


    addColumn(i, data={}) {

        this.columns[i] = new Column(this, i, data)

    }

    removeColumn(i) {

        if (this.columns[i]) {

            this.columns[i].remove()
            this.columns[i] = null

        }

    }


}

module.exports = Sequencer
