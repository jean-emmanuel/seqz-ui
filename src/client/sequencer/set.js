const html = require('nanohtml')

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
        this.title.innerHTML = data.id

    }

    activate() {

        this.html.classList.add('active')

    }

}

module.exports = Set
