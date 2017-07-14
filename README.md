# injection
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

> Tiny script which helps you to build better browser extensions for GitHub.com

## Why you need this package

GitHub.com is a huge web app with millions of visitors every day. To reduce the serve load, some parts are build as a single page app. This means, not every click results in a page reload. This is a big problem for some extension scenarios.

GitHub.com uses [pjax](https://github.com/defunkt/jquery-pjax) which fires an event after replacing the requested page with the previous one. GitHub-inject will invoke the provided callback when `pjax:end` is dispatched and you can reinitialize your extension. For simplicity the callback is also executed on the first script execution.

## Install

```bash
$ npm install --save github-injection
```

## Usage

```js
const gitHubInjection = require('github-injection');

gitHubInjection(() => {
  const el = window.document.getElementsByClassName('header')[0];
  const randomColor = '#' + ((1<<24) * Math.random()|0).toString(16);
  el.style.backgroundColor = randomColor;
});
```


## License

Copyright (c) 2015 Stefan Buck. Licensed under the MIT license.



[npm-url]: https://npmjs.org/package/github-injection
[npm-image]: https://badge.fury.io/js/github-injection.svg
[travis-url]: https://travis-ci.org/octolinker/injection
[travis-image]: https://travis-ci.org/OctoLinker/injection.svg?branch=master
