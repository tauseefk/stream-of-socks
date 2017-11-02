var toyRx = (function (){
  'use strict';

  var Observer = function() {}

  Observer.prototype.next = function(data) {}
  Observer.prototype.complete = function() {}

  var Observable = function(subscribe) {
    this.subscribe = subscribe;
  }

  Observable.prototype.subscribe = function(observer) {}

  /**
   * Stream @extends Observable
   * @param subscribe:
   */
  var Stream = function(subscribe) {
    Observable.call(this, subscribe);
  }

  Stream.prototype = Object.create(Observable.prototype);
  Stream.prototype.constructor = Stream;

  Stream.prototype.map = function(fn) {
    return this.compose(map(fn));
  }

  Stream.prototype.compose = function(operator) {
    operator(this);
  }

  /**
   * @param fn: a function that takes an observable
   * @returns observable with observer mapped to fn
   */
  var map = function(fn) {
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
