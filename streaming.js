'use strict';

var socket = io.connect('http://localhost:8080');

var sockStream = new ToyRx.Stream(observer => {
  socket.on('newElement', observer.next);
  socket.on('disconnect', observer.complete);
})

var mappedStream = sockStream.map(data => data.message);

mappedStream.subscribe(
  {
    next: data => {
      document.querySelector('#counter').textContent++;
      socket.emit('otherEvent', { my: 'data' });
      return data;
    },
    complete: () => { }
  }
);
