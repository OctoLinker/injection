'use strict';

const assert = require('assert');
const {JSDOM} = require('jsdom');
const helper = require('./helper');
const injection = require('..');

describe('GitHub-Injection', () => {

  describe('constructor', () => {

    before(() => {
      global.window = new JSDOM().window;
      global.document = window;
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

    before(function() {
      this.$ = this.result = null;
      this.window = helper('repo_browser.html', '/');
    });

    it('ajax container is present', function() {
      assert.notEqual(this.window.document.getElementById('js-repo-pjax-container'), null);
    });
  });

  describe('markup pr', function() {

    this.timeout(4000);

    before(function() {
      this.$ = this.result = null;
      this.window = helper('pr_browser.html', '/');
    });

    it('ajax container is present', function() {
      assert.notEqual(this.window.document.getElementById('js-pjax-container'), null);
    });
  });

});
