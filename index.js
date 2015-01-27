'use strict';

// Grabbed from underscore.js
// http://underscorejs.org/#debounce
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

module.exports = function (global, options, cb) {
  if (!global) {
    throw new Error('Missing argument global');
  }
  if (!global.document || !global.document.location) {
    throw new Error('Global is not from type window');
  }

  options = options || {};
  options.context = options.context || null;
  options.wait = options.wait || 250;

  cb = debounce(cb, options.wait).bind(options.context);

  var domElement = global.document.getElementById('js-repo-pjax-container');
  if (!domElement || !global.MutationObserver) {
    return cb(null);
  }

  var viewSpy = new global.MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        cb(null);
      }
    });
  });

  viewSpy.observe(domElement, {
    attributes: true,
    childList: true,
    characterData: true
  });

  cb(null);
};
