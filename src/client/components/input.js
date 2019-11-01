class Input extends HTMLElement {

    constructor() {

        super()

        var label = this.getAttribute('label')

        if (icon) {
            var i = document.createElement('i')
            i.classList.add('fas', 'fa-fw', 'fa-' + icon)
            this.appendChild(i)
        }

        if (text) {
            var t = document.createElement('span')
            this.appendChild(t)
        }

    }

}

module.exports = Button
