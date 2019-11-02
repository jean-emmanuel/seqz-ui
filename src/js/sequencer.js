/*
 * Sequencer: communicates with the engine
 *
 */

const engine = require('./engine'),
      EventEmitter = require('events'),
      Set = require('./set')


class Sequencer extends EventEmitter {

    constructor() {

        super()

        this.sets = []
        this.set = 0

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

        this.hasChangedFlag = false

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


    addSet(i, data={}) {

        this.sets[i] = new Set(this, i, data)

        this.changed()

    }

    removeSet(i) {

        if (this.sets[i]) {

            this.sets[i].remove()
            this.sets[i] = null

        }

        this.changed()


    }

    hasChanged() {

        var flag = this.hasChangedFlag
        this.hasChangedFlag = false
        return flag

    }

    changed() {

        this.hasChangedFlag = true

    }



}

module.exports = Sequencer
