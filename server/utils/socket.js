var socket_io = require('socket.io');
var socket = {}
var io = socket_io()
socket.io = io

module.exports = socket
