var toyRx = (function (){
  'use strict';

  var Observer = function() {}

  Observer.prototype.next = function(data){}
  Observer.prototype.complete = function(){}

  var Observable = function(subscribe) {
    this.subscribe = subscribe;
  }

  Observable.prototype.subscribe = function(observer) {}

  var Stream = function(subscribe) {
    Observable.call(this, subscribe);
  }

  Stream.prototype = Object.create(Observable.prototype);
  Stream.prototype.constructor = Stream;

  Stream.prototype.compose = function (operator) {
    return operator(this);
  }

  Stream.prototype.map = function(fn) {
    return this.compose(map(fn));
  }

  function map(fn) {
    return function(stream) {
      return {
        subscribe: function(observer) {
          stream.subscribe({
            next: function(value) {
              return observer.next(fn(value));
            },
            complete: observer.complete
          });
        }
      }
    }
  }

  return {
    Stream: Stream
  }
})()
