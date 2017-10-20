'use strict'
var sockStream2 = new toyRx.Stream(function(observer) {
  socket.on('newElement', observer.next);
  socket.on('disconnect', observer.complete);
})

var blip2 = sockStream2.map(function(data) {
  return data.hello;
});

blip2.subscribe(
  {
    next: function(data) {
      document.querySelector('#counter').textContent++;
      return data;
    },
    complete: function() {}
  }
);
