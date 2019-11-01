class Button extends HTMLElement {

    constructor() {

        super()

        var text = this.getAttribute('text'),
            icon = this.getAttribute('icon')

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
