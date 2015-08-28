// conf.js
exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['login.js'],
  multiCapabilities: [{
	  'browserName': 'internet explorer'
	},{
	  'browserName': 'chrome'
	},{
	  'browserName': 'firefox'
	}]
}