var socket_io = require('socket.io');
var socket = {}
io = socket_io()
socket.io = io

io.of('/socket').on('connection', socket =>{
    console.log("USER connected");
})

module.exports = socket
