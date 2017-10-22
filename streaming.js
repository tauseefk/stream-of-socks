'use strict';

var socket = io.connect('http://localhost:8080');
socket.on('newElement', function (data) {
  socket.emit('my other event', { my: 'data' });
});

var sockStream = new toyRx.Stream(function(observer) {
  socket.on('newElement', observer.next);
  socket.on('disconnect', observer.complete);
})

var blip = sockStream.map(function(data) {
  return data.hello;
});

blip.subscribe(
  {
    next: function(data) {
      document.querySelector('#counter').textContent++;
      return data;
    },
    complete: function() {}
  }
);
