// conf.js
exports.config = {
  framework: 'jasmine2',
  specs: [
    'login.test.js',
    //'users.test.js',
    ],
  multiCapabilities: [
  	{'browserName': 'firefox'},
  	{'browserName': 'internet explorer'},
  	{'browserName': 'chrome'},
  	],
  maxSessions: 1,
}