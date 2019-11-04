const Sequencer = require('./src/server/sequencer')

const seq = new Sequencer()
require('./src/server/electron')
global.seq = seq


seq.on('ready', ()=>{

    var set = {columns:[]}

    for (var i=0; i<20; i++) {
    set.columns.push({
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
            },
        ]
    })
    }

    seq.addSet(0, set)
    seq.addSet(1, set)
    seq.addSet(2, {})

    seq.command('play')

    setTimeout(()=>{

        if (seq.sets[0].columns[0].patterns[1]) seq.sets[0].columns[0].patterns[1].disable()
        setTimeout(()=>{

            if (seq.sets[0].columns[0].patterns[1]) seq.sets[0].columns[0].patterns[1].enable()

        }, 3000)

    }, 3000)

})
