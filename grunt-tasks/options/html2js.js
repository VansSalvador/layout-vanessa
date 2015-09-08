'use strict';

module.exports = function(grunt) {
	return {
		app: {
			options: {
				base: 'static/'
			},
			src: ['src/app/**/*.tmpl.html'],
			dest: 'static/js/app.templates.js'
		}
	}
};
