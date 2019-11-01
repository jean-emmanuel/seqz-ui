class SequencerPanel {

    constructor(seq) {

        this.seq = seq
        this.container = document.getElementById('sequencer-container')
        this.set = 0
        this.cursors = []

        this.build()

    }

    update() {

        if (this.seq.hasChanged()) this.build()

        var cursor = this.seq.cursor

        for (var c of this.cursors) {
            var percent = Math.round(100 * (cursor % c.length) / c.length)
            c.style.transform = 'translate3d('+ percent +'%,0,0)'
        }

    }

    build() {

        this.container.innerHTML = ""
        this.cursors = []

        var set = this.seq.sets[this.set]
        if (!set) return
        var columns = set.columns

        for (let column of columns) {

            let chtml = document.createElement('div')
            chtml.classList.add('column')

            if (column) {

                for (let pattern of column.patterns) {

                    let phtml = document.createElement('div')
                    phtml.classList.add('pattern')

                    if (pattern) {

                        phtml.length = pattern.length
                        phtml.classList.toggle('enabled', pattern.enabled)
                        let cursor = document.createElement('div')
                        cursor.classList.add('cursor')
                        cursor.length = pattern.length
                        cursor.enabled = pattern.enabled
                        this.cursors.push(cursor)
                        phtml.appendChild(cursor)


                    } else {

                        phtml.classList.add('empty')

                    }

                    chtml.appendChild(phtml)

                }
            }

            this.container.appendChild(chtml)

        }

    }


}

module.exports = SequencerPanel
