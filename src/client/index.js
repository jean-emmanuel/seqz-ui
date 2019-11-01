console.log('gogogo')

const {remote} = require('electron'),
      sequencer = remote.getGlobal('seq')

require('../client/components/index')


play = document.getElementById('transport-play')
transport = document.getElementById('transport-cursor')
bpm = document.getElementById('transport-bpm-input')
play.addEventListener('click', ()=>{
    sequencer.command('play')
})
bpm.value = sequencer.bpm




function loop() {

    transport.innerHTML = sequencer.cursor
    requestAnimationFrame(loop)

}

loop()
