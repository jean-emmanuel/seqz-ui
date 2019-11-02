const {remote} = require('electron'),
      sequencer = remote.getGlobal('seq'),
      log = remote.getGlobal('console').log


const SequencerPanel = require('../client/sequencer/'),
      sequencerPanel = new SequencerPanel(sequencer)

require('../client/components/index')


play = document.getElementById('transport-play')
transport = document.getElementById('transport-cursor')
bpm = document.getElementById('transport-bpm-input')
play.addEventListener('click', ()=>{
    sequencer.command('play')
})
bpm.value = sequencer.bpm


var t = Date.now()

function loop() {
    //
    // var tt = Date.now()
    // var fps = 1000/(tt-t)
    // if (fps<45) {
    //     log(fps < 40 ? 'LOW FPS: ' + fps : 'FPS: ' + fps)
    // }
    // t = tt
    //

    // transport.innerHTML = sequencer.cursor

    sequencerPanel.update()

    requestAnimationFrame(loop)

}

loop()
