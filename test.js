const {JSDOM} = require('jsdom');
const it = require('tape');

const gitHubInjection = require('./');

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
global.document = dom.window.document;
global.Event = dom.window.Event;

it('throws an error if callback function is missing', assert => {
  assert.throws(() => gitHubInjection(), /Missing argument callback/);
  assert.end();
});

it('throws an error if called without a callback function', assert => {
  assert.throws(() => gitHubInjection({}), /Callback is not a function/);
  assert.end();
});

it('accepts a callback function', assert => {
  assert.doesNotThrow(() => gitHubInjection(() => {}));
  assert.end();
});

it('calls callback function on initializtion', assert => {
  let count = 0;
  assert.doesNotThrow(() => gitHubInjection(() => count++));
  assert.equal(count, 1);
  assert.end();
});

it('calls callback function when pjax:end event was dispatched', assert => {
  assert.plan(1);
  let count = 0;

  gitHubInjection(() => {
    count++;
    if (count === 2) {
      assert.pass();
    }
  });

  document.dispatchEvent(new Event('pjax:end'));
});
