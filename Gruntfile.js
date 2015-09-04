module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concat-sourcemap');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-js-beautify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-teamcity');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-bower-install');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    teamcity: {
      all: {}
    },
    html2js: {
      app: {
        options: {
          base: 'static/'
        },
        src: ['static/**/*.tmpl.html'],
        dest: 'build/static/app.templates.js'
      }
    },
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
        src: [ 'static/index.html' ]
      }
    },/*
    connect: {
      serve: {
        options: {
          port: 8080,
          base: 'build/static/',
          hostname: '*',
          debug: true
        }
      }
    },*/
    js_beautify: {
      options: {
        // js-beautify options go here
      },
      files: {
        'dest/default_options': ['static/**/*.js', 'static/*.js']
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
        files: ['static/js/**/*.js', 'static/js/*.js'],
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
