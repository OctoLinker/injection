'use strict';

const assert = require('assert');
const {jsdom} = require('jsdom');
const helper = require('./helper');
const injection = require('..');

describe('GitHub-Injection', () => {

  describe('constructor', () => {

    before(() => {
      global.document = jsdom();
      global.window = document.defaultView;
    });

    it('require a callback argument', () => {
      assert.throws(() => injection(), 'Missing argument callback');
    });

    it('callback is not a function', () => {
      assert.throws(() => injection({}), 'Callback is not a function');
    });

    it('accept a callback argument', done => {
      assert.doesNotThrow(() => injection(done));
    });
  });

  describe('markup repo', function() {

    this.timeout(4000);

    before(function(done) {
      this.$ = this.result = null;

      helper('repo_browser.html', '/', (err, window) => {
        if (err) {
          return done(err);
        }
        this.window = window;
        done();
      });
    });

    it('ajax container is present', function() {
      assert.notEqual(this.window.document.getElementById('js-repo-pjax-container'), null);
    });
  });

  describe('markup pr', function() {

    this.timeout(4000);

    before(function(done) {
      this.$ = this.result = null;

      helper('pr_browser.html', '/', (err, window) => {
        if (err) {
          return done(err);
        }
        this.window = window;
        done();
      });
    });

    it('ajax container is present', function() {
      assert.notEqual(this.window.document.getElementById('js-pjax-container'), null);
    });
  });

});
