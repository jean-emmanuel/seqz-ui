class Column extends HTMLElement {

    constructor() {

        super()

        var title = document.createElement('span')
        var wrapper = document.createElement('div')

        title.innerHTML = 'yay'
        this.appendChild(title)
        this.appendChild(wrapper)


    }

}

module.exports = Column
