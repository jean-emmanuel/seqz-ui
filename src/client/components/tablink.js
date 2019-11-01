class Tablink extends HTMLElement {

    constructor() {

        super()

        var tab = document.getElementById(this.getAttribute('tab'))

        this.addEventListener('mousedown', ()=>{
            for (var el of document.querySelectorAll('seqz-tablink.active, .tab-panel.active')) {
                el.classList.remove('active')
            }
            tab.classList.add('active')
            this.classList.add('active')
        })

    }

}

module.exports = Tablink
