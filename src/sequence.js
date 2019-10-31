/*
 * Sequence: a single osc address with different values over time
 *
 */

class Sequence {

    constructor(pattern, data) {

        this.pattern = pattern

        this.id = data.id
        this.address = data.address
        this.type = data.type
        this.note = data.note
        this.values = data.values

    }

    data() {

        // format sequence data for engine

        return {
            id: this.pattern.id + this.id,
            length: this.pattern.length,
            enabled: this.pattern.enabled,
            address: this.address,
            type: this.type,
            note: this.note,
            values: this.values
        }

    }

}
