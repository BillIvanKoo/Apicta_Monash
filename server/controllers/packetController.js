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
                contain_anomaly: true
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

var socketStarted = false

startSocket = () => {
    function getConnectedCapture() {
        return Object.values(Socket.io.of('/captureMachine').connected);
    }
    
    getConnectedCapture().forEach(function(s) {
        s.disconnect(true);
        s.close();
    });
    function getConnectedClients() {
        return Object.values(Socket.io.of('/socket').connected);
    }
    
    getConnectedClients().forEach(function(s) {
        s.disconnect(true);
        s.close();
    });


    // for client
    Socket.io.of('/socket').on('connect', _ => {
        updateClient()
    })


    // for capture machine
    let captureConnected = 0
    // setTimeout(() => {
    //     setInterval(() => {
    //         if (captureConnected == 0){
    //             Packet.create({
    //                 connected: false,
    //                 timestamp: Date.now() / 1000,
    //                 total: 0,
    //                 total_tcp: 0,
    //                 total_http: 0,
    //                 total_udp: 0,
    //                 size: 0,
    //                 size_tcp: 0,
    //                 size_http: 0,
    //                 size_udp: 0,
    //                 segmentId: 1
    //             }).then(_ => {
    //                 updateClient()
    //             })
    //         } else {
    //             Socket.io.of('/captureMachine').emit('capture', Date.now() / 1000)
    //         }
    //     }, 300000);
    // }, 10000)

    Socket.io.of('/captureMachine').on('connect', socket => {
        console.log(socket.id + ' connected');
        socket.on('yes capture', () =>{
            captureConnected++;
            console.log(captureConnected)
        })
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
            console.log(socket.id + ' disconnected');
            console.log(captureConnected)
        })
        Socket.io.of('/captureMachine').emit('is capture')
    })
}

if (socketStarted === false) {
    startSocket();
    socketStarted = true;
}

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
        updateClient();
        res.send(newPacket);
    })
}

updateScoreBasedOnTimestamp = (req, res) => {
    Packet.findOne({
        where: {
            timestamp: Number(req.body.timestamp)
        }
    }).then(packet => {
        contain_anomaly = false
        console.log(req.body)
        for(const [key, value] of Object.entries(req.body)) {
            if (key !== "timestamp"){
                if (Number(value) >= 0.9) {
                    contain_anomaly = true
                    break
                }
            }
        }
        packet.update({
            total_score: Number(req.body.total),
            total_tcp_score: Number(req.body.total_tcp),
            total_http_score: Number(req.body.total_http),
            total_udp_score: Number(req.body.total_udp),
            size_score: Number(req.body.size),
            size_tcp_score: Number(req.body.size_tcp),
            size_http_score: Number(req.body.size_http),
            size_udp_score: Number(req.body.size_udp),
            contain_anomaly
        }).then(updatedPacket=>{
            updateClient()
            res.send(updatedPacket)
        }).catch(err => {
            res.send(err)
        })
    }).catch(err => {
        res.send(err)
    })
}

getAnomalies = (req, res) => {
    packetQuery(req.query.limit, true)
    .then(packets => {res.send(packets)})
}

getPacketsInAnHour = (req, res) => {
    let time = Number(req.params.time);
    let start = time - (time % 3600);
    let end = start + 3600;
    let option = {
        attributes: ['id', 'total', 'total_tcp', 'total_http', 'total_udp', 'timestamp', 'size', 'size_tcp', 'size_http', 'size_udp', 'connected', 'contain_anomaly', 'total_score', 'total_tcp_score', 'total_http_score', 'total_udp_score', 'size_score', 'size_tcp_score', 'size_http_score', 'size_udp_score'],
        where: {
            timestamp: {
                $between: [start, end]
            }
        }
    }
    Packet.findAll(option)
    .then(packets => res.send(packets))
    .catch(err => res.send(err))

}

getPacketsInTwoMinutes = (req, res) => {
    let time = Number(req.params.time);
    let start = time - (time % 60);
    let end = start + 120;
    let option = {
        attributes: ['id', 'total', 'total_tcp', 'total_http', 'total_udp', 'timestamp', 'size', 'size_tcp', 'size_http', 'size_udp', 'connected', 'contain_anomaly', 'total_score', 'total_tcp_score', 'total_http_score', 'total_udp_score', 'size_score', 'size_tcp_score', 'size_http_score', 'size_udp_score'],
        where: {
            timestamp: {
                $between: [start, end]
            }
        }
    }
    Packet.findAll(option)
    .then(packets => res.send(packets))
    .catch(err => res.send(err))
}

module.exports = { getPackets, getPacket, addPacket, getAnomalies, getPacketsInAnHour, getPacketsInTwoMinutes, updateScoreBasedOnTimestamp }