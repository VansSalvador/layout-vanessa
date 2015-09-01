// conf.js
exports.config = {
  framework: 'jasmine2',
  specs: ['login.test.js'],
  multiCapabilities: [
  	{'browserName': 'internet explorer'},
  	{'browserName': 'chrome'},
  	{'browserName': 'firefox'},
  	],
  maxSessions: 1,
}