'use strict';

module.exports = function(grunt) {
  return {
    js_beautify: {
      options: {
      // js-beautify options go here
      },
      files: {
      'dest/default_options': ['static/**/*.js', 'static/*.js', 'grunt-tasks/*.js', 'grunt-tasks/**/*.js']
      }
    },
  }
};
