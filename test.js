const jsdom = require('jsdom');

function loadPage(url, done) {
  jsdom.env({
    url,
    done: (err, window) => {
      if (err) {
        return done(err);
      }
      done(null, window);
    }
  });
}

describe('github-injection', () => {

  it('test', (done) => {
    loadPage('http://github.com', (err, window) => {
      if (err) {
        return done(err);
      }

      console.log(window.gitHubInjection);

    });
  });
});
