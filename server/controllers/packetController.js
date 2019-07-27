const model = require("../models");
const Packet = model.Packet;
const socket = require('../utils/socket');

getPackets = (req, res) => {
    let option = {
        attributes: ['id', 'total', 'total_tcp', 'total_http', 'total_udp', 'timestamp', 'size', 'size_tcp', 'size_http', 'size_udp']
    }
    if (req.query.limit) {
        option = {...option,
            limit: Number(req.query.limit),
            order: [['createdAt', 'DESC']]
        }
    }
    Packet.findAll(option)
    .then( packets => {
        res.send(packets);
    })
}

getPacket = (req, res) => {
    Packet.findOne({
        id: req.params.id
    })
    .then( packet => {
        res.send(packet);
    })
}

addPacket = (req, res) => {
    Packet.create(req.body)
    .then( newPacket => {
        res.send(newPacket);
    })
}

module.exports = { getPackets, getPacket, addPacket }