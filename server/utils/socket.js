var socket_io = require('socket.io');
var socket = {}
io = socket_io()
socket.io = io


module.exports = socket
