// conf.js
exports.config = {
  framework: 'jasmine2',
  specs: ['login.js'],
  multiCapabilities: [{
	  'browserName': 'internet explorer'
	},{
	  'browserName': 'chrome'
	},{
	  'browserName': 'firefox'
	}]
}