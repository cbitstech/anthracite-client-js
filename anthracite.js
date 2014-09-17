;(function() {
  'use strict';

  function A(options) {
    options = options || {};

    this._serverUrl = options.serverUrl || 'http://localhost:3000';
  }

  // Public methods

  A.prototype.logEvent = function() {
    var aEvent = new AnthraciteEvent({
      kind: 'app_crash',
      payload: 'some JSON',
      sharedSecret: 'default',
      userId: 'test',
      userAgent: 'web'
    });
    this._postEvent(aEvent);

    return this;
  };

  // Private methods

  A.prototype._postEvent = function(aEvent) {
    var httpRequest = new XMLHttpRequest();
    var isAsynchronous = true;

    httpRequest.open('POST', this._serverUrl + '/events', isAsynchronous);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(aEvent.toJson());
  };

  // Supporting classes

  function AnthraciteEvent(options) {
    options = options || {};

    this.kind = options.kind || 'default_event';
    this.payload = options.payload || 'NO DATA';
    this.sharedSecret = options.sharedSecret || 'default';
    this.userId = options.userId || 'test';
    this.userAgent = options.userAgent || 'web';
  }

  AnthraciteEvent.prototype.toJson = function() {
    return JSON.stringify({
      event: {
        kind: this.kind,
        clientTimestamp: (new Date()).toISOString(),
        payload: this.payload,
        userId: this.userId,
        userAgent: this.userAgent
      }
    });
  };

  window.Anthracite = A;
})();
