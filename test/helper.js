'use strict';

const util = require('util');
const fs = require('fs');
const path = require('path');
const {env} = require('jsdom');

module.exports = (file, url, done) => {
  let content;
  let baseUrl;
  let filePath;
  baseUrl = 'https://github.com/octo-linker/injection/';

  if (typeof url === 'function') {
    done = url;
    url = 'blob/master/test/fixtures/' + file;
  }

  url = baseUrl + url;

  if (process.env.TEST_ENV === 'remote') {
    content = url;
    console.log('    remote tests');
  } else {
    console.log('    local tests');
    filePath = util.format('./fixtures/%s', file);
    filePath = path.resolve(__dirname, filePath);
    content = fs.readFileSync(filePath, 'utf-8');
  }

  env(content, (err, window) => {
    if (err) {
      return done(err);
    }

    if (process.env.TEST_ENV !== 'remote') {
      window.document.location.href = url;
    }

    if (process.env.TEST_ENV !== 'remote') {
      window.document.location.href = url;
    }

    done(null, window);
  });
};
