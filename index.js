'use strict';

const gitHubInjection = cb => {
  if (!cb) {
    throw new Error('Missing argument callback');
  }

  if (typeof cb !== 'function') {
    throw new Error('Callback is not a function');
  }

  const domElement = document.querySelector('#js-repo-pjax-container, #js-pjax-container');
  if (!domElement) {
    return cb();
  }

  const viewSpy = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
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

// Export the gitHubInjection function for **Node.js**
// Otherwise leave it as a global
if (typeof exports !== 'undefined') {
  exports.gitHubInjection = gitHubInjection;
}
