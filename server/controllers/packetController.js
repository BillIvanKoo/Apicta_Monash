const axios = require("axios");
const Packet = require("../models").Packet;
const Socket = require('../utils/socket');

packetQuery = (limit, anomaly) => {
    let option = {
        attributes: ['id', 'total', 'total_tcp', 'total_http', 'total_udp', 'timestamp', 'size', 'size_tcp', 'size_http', 'size_udp', 'connected', 'contain_anomaly', 'total_score', 'total_tcp_score', 'total_http_score', 'total_udp_score', 'size_score', 'size_tcp_score', 'size_http_score', 'size_udp_score']
    }
    if (limit) {
        option = {...option,
            limit: Number(limit),
            order: [['createdAt', 'DESC']]
        }
    }
    if (anomaly) {
        option = {...option,
            where: {
                anomaly: true
            }
        }
    }
    return Packet.findAll(option)
}

updateClient = () => {
    packetQuery(10)
        .then( packets => {
            Socket.io.of('/socket').emit("send packet list", {
                packets
            })
        })
}

// for client
Socket.io.of('/socket').on('connection', socket => {
    packetQuery(10)
    .then( packets => {
        socket.emit("send packet list", {
            packets
        })
    })
})


// for capture machine
let captureConnected = 0
setTimeout(() => {
    setInterval(() => {
        if (captureConnected == 0){
            Packet.create({
                connected: false,
                timestamp: Date.now() / 1000
            }).then(_ => {
                updateClient()
            })
        } else {
            Socket.io.of('/capture').emit('capture', Date.now() / 1000)
        }
    }, 300000);
}, 10000)

Socket.io.of('/capture').on('connection', socket => {
    captureConnected++;
    socket.on('captured', data => {
        data = JSON.parse(data)
        Packet.create(data)
        .then( packet => {
            axios.post("http://localhost:3001/data", {data: [{...data, timestamp: Number(data.timestamp)}]})
            .then(result => {
                res = result.data[0]
                contain_anomaly = false
                for(const [key, value] of Object.entries(res)) {
                    if (key !== "timestamp"){
                        if (value >= 0.9) {
                            contain_anomaly = true
                            break
                        }
                    }
                }
                packet.update({
                    total_score: res.total,
                    total_tcp_score: res.total_tcp,
                    total_http_score: res.total_http,
                    total_udp_score: res.total_udp,
                    size_score: res.size,
                    size_tcp_score: res.size_tcp,
                    size_http_score: res.size_http,
                    size_udp_score: res.size_udp,
                    contain_anomaly
                }).then(() => {updateClient()});
            })
            .catch(err => {
                console.log("AI ERROR")
                console.log(err)
            })
            updateClient();
        })
    })
    socket.on('disconnect', () => {
        captureConnected--;
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
            Socket.io.of('/socket').emit("send packet list", {
                packets
            })
        })
        res.send(newPacket);
    })
}

getAnomalies = (req, res) => {
    packetQuery(req.query.limit, true)
    .then(packets => {res.send(packets)})
}

module.exports = { getPackets, getPacket, addPacket }