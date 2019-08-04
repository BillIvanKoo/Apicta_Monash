const model = require("../models");
const Packet = model.Packet;
const socket = require('../utils/socket');

packetQuery = (limit) => {
    let option = {
        attributes: ['id', 'total', 'total_tcp', 'total_http', 'total_udp', 'timestamp', 'size', 'size_tcp', 'size_http', 'size_udp']
    }
    if (limit) {
        option = {...option,
            limit: Number(limit),
            order: [['createdAt', 'DESC']]
        }
    }
    return Packet.findAll(option)
}

io.of('/socket').on('connection', socket =>{
    packetQuery(10)
    .then( packets => {
        socket.emit("send packet list", {
            packets
        })
    })
})

getPackets = (req, res) => {
    packetQuery(req.query.limit)
    .then( packets => {res.send(packets)})
}

getPacket = (req, res) => {
    Packet.findOne({
        where: {
            id: Number(req.params.id)
        }
    })
    .then( packet => {
        res.send(packet);
    })
}

addPacket = (req, res) => {
    Packet.create(req.body)
    .then( newPacket => {
        packetQuery(10)
        .then( packets => {
            io.of('/socket').emit("send packet list", {
                packets
            })
        })
        res.send(newPacket);
    })
}

module.exports = { getPackets, getPacket, addPacket }