'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use('/', express.static(__dirname));
server.listen(8080);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  socket.emit('newElement', 'connection established!');
  socket.on('otherEvent', data => {
    setTimeout(() => {
      socket.emit('newElement', { message: 'world' });
    }, 2000);
  });
});
