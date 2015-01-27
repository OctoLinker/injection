'use strict';

require('should');
var helper = require('./helper');

describe('injection', function() {

  this.timeout(4000);

  before(function(done) {
    this.$ = this.result = null;

    helper('repo_browser.html', '/', function(_jquery, _result) {
      this.$ = _jquery;
      this.result = _result;
      done();
    }.bind(this));
  });

  it('dom element is present', function() {
    this.$('#js-repo-pjax-container').length.should.equal(1);
  });
});
