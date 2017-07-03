'use strict';

var assert = require('assert');
var jsdom = require('jsdom').jsdom;
var helper = require('./helper');
var injection = require('..');

describe('GitHub-Injection', function() {

  describe('constructor', function() {

    before(function() {
      global.document = jsdom();
      global.window = document.defaultView;
    });

    it('require a callback argument', function () {
      assert.throws(injection, 'Missing argument callback');
    });

    it('callback is not a function', function () {
      assert.throws(injection.bind(null, {}, {}), 'Callback is not a function');
    });

    it('accept a callback argument', function (done) {
      assert.doesNotThrow(injection.bind(null, done));
    });
  });

  describe('markup repo', function() {

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

  describe('markup pr', function() {

    this.timeout(4000);

    before(function(done) {
      this.$ = this.result = null;

      helper('pr_browser.html', '/', function(err, window) {
        if (err) {
          return done(err);
        }
        this.window = window;
        done();
      }.bind(this));
    });

    it('ajax container is present', function() {
      assert.notEqual(this.window.document.getElementById('js-pjax-container'), null);
    });
  });

});
