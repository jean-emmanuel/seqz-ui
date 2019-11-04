// From open-stage-control @ jean-emmanuel doucet (GPL-3)

module.exports = {

    copy: function(obj, precision) {

        var copy = obj

        if (obj === null) {
            return obj
        }

        if (typeof obj === 'object') {
            copy = Array.isArray(obj) ? [] : {}
            for (let key in obj) {
                copy[key] = module.exports.copy(obj[key], precision)
            }
        } else if (typeof obj == 'number') {
            return precision === undefined ? copy : parseFloat(copy.toFixed(precision))
        }

        return copy

    },

    equal: function(a, b) {

        var ta = typeof a,
            tb = typeof b

        if (ta !== tb) {
            return false
        } else if (ta === 'object') {
            return JSON.stringify(a) === JSON.stringify(b)
        } else {
            return a === b
        }

    }

}
