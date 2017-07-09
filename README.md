# injection
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Tiny script which helps you to build better browser extensions for GitHub.com

## Why you need this package

GitHub.com is a huge web app with millions of visitors every day. To reduce the serve load, some parts are build as a single page app. This means, not every click results in a page reload. This is a big problem for some extension scenarios.

The Github-Injection registers a listener to the dom which detects dom changes. If a significant dom node changed his content, the callback will be executed and you can reinitialize your extension. For simplicity the callback is also executed on the first script execution.

A sample implementation can be found in the [Octo-Linker-Core](https://github.com/octo-linker/core/blob/4a30c6606465e294d1ae1c9ca394ba03368928f7/index.js#L8-L10) package.

## Install

Bower
```bash
$ bower install --save github-injection
```

Node
```bash
$ npm install --save github-injection
```

## Usage

### Browser
```js
gitHubInjection(window, function(err) {
  if (err) {
    return console.error(err);
  }
  var el = window.document.getElementsByClassName('header')[0];
  var randomColor = '#' + ((1<<24) * Math.random()|0).toString(16);
  el.style.backgroundColor = randomColor;
});

```

### Node (Browserify)
```js
var gitHubInjection = require('github-injection');

gitHubInjection(window, function(err) {
  if (err) {
    throw err;
  }
  var el = window.document.getElementsByClassName('header')[0];
  var randomColor = '#' + ((1<<24) * Math.random()|0).toString(16);
  el.style.backgroundColor = randomColor;
});

```


## License

Copyright (c) 2015 Stefan Buck. Licensed under the MIT license.



[npm-url]: https://npmjs.org/package/github-injection
[npm-image]: https://badge.fury.io/js/github-injection.svg
[travis-url]: https://travis-ci.org/octolinker/injection
[travis-image]: https://travis-ci.org/OctoLinker/injection.svg?branch=master
