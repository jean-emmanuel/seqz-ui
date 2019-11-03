/*
 * Engine: manages the c++ engine process
 *
 */

const {spawn} = require('child_process'),
      EventEmitter = require('events')
      net = require('net'),
      unix = require('unix-dgram'),
      fs = require('fs'),
      osc = require('osc/src/osc.js'),
      seqzeroPath = require(__dirname + '/../../seqzero/seqzero')


const FEEDBACK_SOCKET = '/tmp/seqz-ui-' + Math.random(),
      CONTROL_SOCKET  = FEEDBACK_SOCKET + '-ctrl'

class Engine extends EventEmitter {

    constructor() {

        super()

    }

    start() {

        // feedback receiver

        this.server = unix.createSocket('unix_dgram', (message)=>{

            var {address, args} = osc.readPacket(message, {})
            this.emit(address, JSON.parse(args[0]))

        })

        this.server.bind(FEEDBACK_SOCKET)

        // engine process

        this.process = spawn(seqzeroPath, [
            '--target-url', 'osc.udp://127.0.0.1:5245',
            '--osc-port', 'osc.unix://' + CONTROL_SOCKET,
            '--feedback-url', 'osc.unix://' + FEEDBACK_SOCKET
        ])

        // this.process.stderr.on('data', (data) => {
        //     console.error(`seqz error: ${data}`)
        // })

        // node process hook
        process.on('exit', (code)=>{
            this.process.kill()
            this.server.close()
            fs.unlinkSync(FEEDBACK_SOCKET)
        })

        process.on('SIGINT', (code)=>{
            process.exit(2)
        })

    }

    send(address, ...args) {

        for (var i = 0; i < args.length; i++) {
            if (typeof args[i] == 'object' && args[i] != null) {
                args[i] = JSON.stringify(args[i])
            }
        }

        var packet = osc.writePacket({
            address,
            args
        })

        this.server.send(packet, 0, packet.length, CONTROL_SOCKET)

    }

}

module.exports = new Engine()
