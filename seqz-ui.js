const Sequencer = require('./src/js/sequencer')

const seq = new Sequencer()
require('./src/js/electron')
global.seq = seq


seq.on('ready', ()=>{

    for (var i=0; i<10; i++) {
    seq.addSet(i, {columns:[{
        patterns: [
            null,
            {
                enabled: true,
                length: 192,
                sequences:[
                    {
                        values: {0:0, 96: 1}
                    }
                ]
            },
            {
                enabled: false,
                length: 400,
                sequences:[
                    {
                        values: {0:0, 96: 1}
                    }
                ]
            }
        ]
    }]})
    }

    seq.command('play')

    setTimeout(()=>{

        if (seq.sets[0].columns[0].patterns[0]) seq.columns[0].patterns[0].disable()
        setTimeout(()=>{

            if (seq.sets[0].columns[0].patterns[0]) seq.columns[0].patterns[0].enable()

        }, 1000)

    }, 1000)

})
