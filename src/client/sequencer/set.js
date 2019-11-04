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

        this.html.addEventListener('mousedown', ()=>{
            engine.setActiveSet(this.id)
        })

        this.updateData(data)

    }

    updateData(data) {
        
        this.id = data.id
        this.title = this.html.getElementsByClassName('title')[0]
        this.title.innerHTML = `${data.id}: ${data.label}`

    }

    toggle(state) {

        this.html.classList.toggle('active', state)

    }

}

module.exports = Set
