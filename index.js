'use strict';

var gitHubInjection = function (cb) {
  if (!cb) {
    throw new Error('Missing argument callback');
  }

  if (typeof cb !== 'function') {
    throw new Error('Callback is not a function');
  }

  var domElement = document.querySelector('#js-repo-pjax-container, #js-pjax-container');
  if (!domElement || typeof MutationObserver === 'undefined') {
    return cb();
  }

  var viewSpy = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length) {
        cb();
      }
    });
  });

  viewSpy.observe(domElement, {
    childList: true
  });

  cb();
};

// Export the gitHubInjection function for **Node.js**, with
// backwards-compatibility for the old `require()` API. If we're in
// the browser, add `gitHubInjection` as a global object.
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = gitHubInjection;
  }
  exports.gitHubInjection = gitHubInjection;
} else {
  /*jshint -W040 */
  this.gitHubInjection = gitHubInjection;
  /*jshint +W040 */
}
