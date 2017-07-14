describe('gitHubInjection', () => {
  it('throws an error if callback function is missing', () => {
    assert.throws(() => gitHubInjection(), 'Missing argument callback');
  });

  it('throws an error if called without a callback function', () => {
    assert.throws(() => gitHubInjection({}), 'Callback is not a function');
  });

  it('accepts a callback function', () => {
    assert.doesNotThrow(() => gitHubInjection(() => {}));
  });

  it('calls callback function on initializtion', done => {
    assert.doesNotThrow(() => gitHubInjection(done));
  });

  it('calls callback function when pjax:end event was dispatched', done => {
    let count = 0;

    gitHubInjection(() => {
      count++;
      if (count === 2) {
        done();
      }

      document.dispatchEvent(new Event('pjax:end'));
    });
  });
});
