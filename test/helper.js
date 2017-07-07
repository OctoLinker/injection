'use strict';

const util = require('util');
const fs = require('fs');
const path = require('path');
const {JSDOM} = require('jsdom');

module.exports = (file, url) => {
  let content;
  let baseUrl;
  let filePath;
  baseUrl = 'https://github.com/octo-linker/injection/';

  if (typeof url === 'undefined') {
    url = 'blob/master/test/fixtures/' + file;
  }

  url = baseUrl + url;

  if (process.env.TEST_ENV === 'remote') {
    content = url;
    console.log('    remote tests');
  } else {
    console.log('    local tests');
    if (file) {
      filePath = util.format('./fixtures/%s', file);
      filePath = path.resolve(__dirname, filePath);
      content = fs.readFileSync(filePath, 'utf-8');
    }
  }

  const {window} = new JSDOM(content, {url});
  return window;
};
