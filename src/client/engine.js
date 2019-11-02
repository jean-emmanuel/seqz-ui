const {remote} = require('electron'),
      sequencer = remote.getGlobal('seq')

module.exports = sequencer
