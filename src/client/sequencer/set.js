const html = require('nanohtml'),
      engine = require('../engine')

class Set {

    constructor(panel, data) {

        this.parent = panel

        this.html = html`
            <div class="set-item">
                <div class="title"></div>
            </div>
        `
        this.id = data.id
        this.title = this.html.getElementsByClassName('title')[0]
        this.title.innerHTML = `${data.id}: ${data.label}`

        this.html.addEventListener('mousedown', ()=>{
            engine.setActiveSet(this.id)
        })

    }

    activate() {

        this.html.classList.add('active')

    }

}

module.exports = Set
