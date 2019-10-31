/*
 * Pattern: a group of sequences of the same length
 *
 */

class Pattern {

    constructor(sequencer) {

        this.sequencer = sequencer

        this.id = ''
        this.length = 0
        this.enabled = false

        this.sequences = {}

    }

    updateSequence(data) {

        var id = data.id

        if (!this.sequences[id]) return

        if (data.removed) {

            delete this.sequences[id]

        } else {

            Object.assign(data)

        }

    }


}
