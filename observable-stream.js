;(function (Rx) {
  'use strict';

  class Observable {
    constructor(subscribe) {
      this.subscribe = subscribe;
    }

    subscribe () {}
  }

  /**
   * @extends Observable
   * @param subscribe:
   */
  class Stream extends Observable {
    constructor(subscribe) {
      super(subscribe);
    }
    compose(operator) {
      return operator(this);
    }
    map(fn) {
      return this.compose(map(fn));
    }
  }

  /**
   * @param fn: a function that takes an observable
   * @returns observable with observer mapped to fn
   */
  var map = function (fn) {
    return function (stream) {
      return {
        subscribe: function (observer) {
          stream.subscribe({
            next: function (value) {
              return observer.next(fn(value));
            },
            complete: observer.complete
          })
        }
      }
    }
  }

  Rx.Stream = Stream;

}) (ToyRx = {})
