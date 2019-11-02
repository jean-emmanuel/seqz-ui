const sequencerPanel = require('../client/sequencer/')

require('../client/components/index')


// play = document.getElementById('transport-play')
// transport = document.getElementById('transport-cursor')
// bpm = document.getElementById('transport-bpm-input')
// play.addEventListener('click', ()=>{
//     sequencer.command('play')
// })
// bpm.value = sequencer.bpm

function mainLoop() {

    sequencerPanel.update()

    requestAnimationFrame(mainLoop)

}

requestAnimationFrame(mainLoop)
