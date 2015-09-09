// conf.js
exports.config = {
  framework: 'jasmine2',
  specs: [
    'login.test.js',
    'users.test.js',
    ],
  multiCapabilities: [
  	{'browserName': 'firefox'},
  	{'browserName': 'chrome'},
  	//{'browserName': 'internet explorer'},
  	],
  maxSessions: 1,
}