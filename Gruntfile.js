module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: process.env,
    html2js: {
      appEpicom: {
        options: {
          base: 'src/app/',
          fileHeaderString: '/* global angular: false */\n'
        },
        src: ['src/app/**/*.tmpl.html'],
        dest: 'static/js/epicom/appEpicom.templates.js',
        rename: function(moduleName) {
          return '/' + moduleName.replace('.html', '');
        },
        useStrict: true,
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      }
    },
    js_beautify: {
      options: {
        // js-beautify options go here
      },
      files: {
      'dest/default_options': ['static/**/*.js', 'static/*.js', 'grunt-tasks/*.js', 'grunt-tasks/**/*.js']
      }
    },
    teamcity: {
      all: {}
    },
    ngAnnotate: {
      options: {
          singleQuotes: true,
          add: true,
          remove: true
      },
      app: {
        files: [
          {
            expand: true,
            cwd: 'src/app',
            src: '*.js',
            dest: 'src/app'
          },
        ],
      }
    },
    less: {
      all: {
        src: 'src/app/style.less',
        dest: 'static/css/epicom/style.css',
        options: {
          report: 'gzip'
        }
      }
    },
    watch: {
      options: {
        atBegin: true
      },
      templates: {
        files: ['src/app/**/*.tmpl.html'],
        tasks: ['html2js']
      },
      less: {
        files: ['src/app/style.less', 'src/app/**/*.less'],
        tasks: ['less']
      },
      sources: {
        files: ['src/app/**/*.js', 'src/app/*.js'],
        tasks: ['ngAnnotate', 'concat_sourcemap:app']
      },
      images: {
        files: ['src/app/**/*.png', 'src/app/**/*.gif', 'src/app/**/*.jpg'],
        tasks: ['copy:images']
      },
      css: {
        files: ['src/vendor/angular-ui-grid/ui-grid.css', 'src/app/**/*.css'],
        tasks: ['copy:css1']
      },
      index: {
        files: 'src/app/index.html',
        tasks: ['copy:index']
      },
      jsTest: {
        files: ['src/test/test/karma.conf.js', 'src/test/test/spec/{,*/}*.js'],
        tasks: ['karma']
      }
    },
    concat_sourcemap: {
      options: {
        sourcesContent: true
      },
      app: {
        src: ['src/app/**/*.js', 'src/app/*.js'],
        dest: 'static/js/epicom/appEpicom.js'
      },
      libs: {
        src: [
          'src/vendor/jquery/dist/jquery.js',
          'src/vendor/angular/angular.js',
          'src/vendor/angular-animate/angular-animate.js',
          'src/vendor/angular-route/angular-route.js',
          'src/vendor/angular-ui-router/release/angular-ui-router.js'
        ],
        dest: 'static/js/epicom/libs.js'
      }
    },
    copy: {
      css2: {
        cwd: 'src/vendor/angular-ui-grid/',
        src: ['ui-grid.css'],
        dest: 'static/css/',
      },
      css1: {
        cwd: 'src/app/css',
        src: ['src/app/css/*.css'],
        dest: 'static/css/',
      },
      images: {
        src: ['src/app/**/*.png', 'src/app/**/*.gif', 'src/app/**/*.jpg'],
        dest: 'static/',
      },
      index: {
        src: 'src/app/index.html',
        dest: 'static/index.html',
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
        src: ['static/css/epicom', 'static/js/epicom', 'static/index.html']
      }
    },
    // Test settings
    karma: {
      unit: {
        configFile: 'src/client/test/karma.conf.js',
        singleRun: true
      }
    },
    useminPrepare: {
      html: 'src/app/index.html'
    },
    usemin: {
      html: 'static/index.html'
    }
  });

  grunt.registerTask('build', ['clean', 'html2js', 'less', 'ngAnnotate', 'concat_sourcemap:app', 'concat_sourcemap:libs', 'copy']);
  grunt.registerTask('default', ['clean', 'concat_sourcemap:libs', 'watch']);
  grunt.registerTask('test', ['karma']);
};
