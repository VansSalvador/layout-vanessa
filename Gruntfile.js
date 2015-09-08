module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('grunt-tasks');
  
  
  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
  
    glob.sync('*', { cwd: path }).forEach(function(option) {
      var key = option.replace(/\.js$/, '');
      object[key] = require(path + option);
    });
  
    return object;
  }
  
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env
  };
  
  grunt.util._.extend(config, loadConfig('./grunt-tasks/options/'));
  
  grunt.initConfig(config);

  grunt.initConfig({
    less: {
      all: {
        src: 'static/style.less',
        dest: 'build/static/style.css',
        options: {
          report: 'gzip'
        }
      }
    },
    bowerInstall: {
      target: {     
        src: [ 'templates/index.html' ]
      }
    },
    ngAnnotate: {
      options: {
          singleQuotes: true,
          add: true,
          remove: true
      },
      appEpicom: {
        files: [
          {
            expand: true,
            cwd: 'static/app',
            src: '*.js', 
            ext: '.js',
            extDot: 'last',
          },
        ],
      }
    },
    watch: {
      options: {
        atBegin: true
      },
      templates: {
        files: ['static/*.tpl.html'],
        tasks: ['html2js']
      },
      less: {
        files: ['static/style.less', 'static/**/*.less'],
        tasks: ['less']
      },
      sources: {
        files: ['static/app/**/*.js', 'static/app/*.js'],
        tasks: ['ngAnnotate', 'concat_sourcemap:app']
      },
      images: {
        files: ['static/**/*.png', 'static/**/*.gif', 'static/**/*.jpg'],
        tasks: ['copy:images']
      },
      index: {
        files: 'static/index.html',
        tasks: ['copy:index']
      },
      jsTest: {
        files: ['src/client/test/karma.conf.js', 'src/client/test/spec/{,*/}*.js'],
        tasks: ['karma']
      }
    },
    concat_sourcemap: {
      options: {
        sourcesContent: true
      },
      app: {
        src: ['static/js/**/*.js', 'static/js/*.js'],
        dest: 'build/static/app.js'
      },
      libs: {
        src: [
          'static/libs/angular/angular.js',
          'static/libs/angular-animate/angular-animate.js',
          'static/libs/angular-mocks/angular-mocks.js',
          'static/libs/angular-ui-router/release/angular-ui-router.js'
        ],
        dest: 'build/static/libs.js'
      }
    },
    copy: {
      images: {
        src: ['static/**/*.png', 'static/**/*.gif', 'static/**/*.jpg'],
        dest: 'build/static/',
      },
      index: {
        src: 'static/index.html',
        dest: 'build/static/index.html',
        options: {
          processContent: function (content, srcpath) {
            // Compiling index.html file!
            var packageVersion = require('./package.json').version;
            return grunt.template.process(content, {
              data: {
                version: packageVersion
              }
            });
          }
        }
      },
    },
    clean: {
      all: {
        src: ['build/static/']
      }
    },
    // Test settings
    karma: {
      unit: {
        configFile: 'src/client/test/karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('build', ['clean', 'html2js', 'less', 'ngAnnotate', 'concat_sourcemap:app', 'concat_sourcemap:libs', 'copy']);
  grunt.registerTask('default', ['clean', 'concat_sourcemap:libs', /*'connect',*/ 'watch']);
  grunt.registerTask('test', ['karma']);
};
