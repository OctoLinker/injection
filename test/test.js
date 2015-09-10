'use strict';

var assert = require('assert');
var helper = require('./helper');
var injection = require('..');

var fakeWindow = {
  document: {
    getElementById: function() {}
  }
};

describe('GitHub-Injection', function() {

  describe('constructor', function() {

    it('require a window argument', function () {
      assert.throws(injection.bind(null), 'Missing argument global');
    });

    it('require a callback argument', function () {
      assert.throws(injection.bind(null, fakeWindow), 'Missing argument callback');
    });

    it('callback is not a function', function () {
      assert.throws(injection.bind(null, fakeWindow, {}, {}), 'Callback is not a function');
    });

    it('window parameter is not valid', function () {
      assert.throws(injection.bind(null, {}), 'The given argument global is not a valid window object');
    });

    it('accept a callback argument', function (done) {
      assert.doesNotThrow(injection.bind(null, fakeWindow, done));
    });

    it('accept a options and callback argument', function (done) {
      assert.doesNotThrow(injection.bind(null, fakeWindow, {}, done));
    });
  });

  describe('markup', function() {

    this.timeout(4000);

    before(function(done) {
      this.$ = this.result = null;

      helper('repo_browser.html', '/', function(err, window) {
        if (err) {
          return done(err);
        }
        this.window = window;
        done();
      }.bind(this));
    });

    it('ajax container is present', function() {
      assert.notEqual(this.window.document.getElementById('js-repo-pjax-container'), null);
    });
  });

});
