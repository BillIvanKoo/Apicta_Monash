const Packet = require('../models/packet');

getPackets = (req, res) => {
    Packet.findAll({})
    .then( packets => {
        res.send({ packets });
    })
}

addPacket = (req, res) => {
    Packet.create(req.body.packet)
    .then( newPacket => {
        res.send(newPacket);
    })
}

module.exports = { getPackets, addPacket }