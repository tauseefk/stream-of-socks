'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use('/', express.static(__dirname));
server.listen(8080);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('newElement', 'connection established!');
  socket.on('my other event', function (data) {
    setTimeout(function() {
      socket.emit('newElement', {hello: 'world'});
    }, 2000);
  });
});
