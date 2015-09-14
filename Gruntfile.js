/*global module:false, require:true*/
'use strict';

var config = require('./buildConfig');
var _config =  {
  front:        config.mix('front'),
  common:       config.mix('common'),
  chatComp:     config.mix('chatComp'),
  dashboard:    config.mix('dashboard'),
  config:       config.mix('config'),
  chat:         config.mix('chat'),
  faq:          config.mix('faq'),
  knowledge:    config.mix('knowledge'),
  profile:      config.mix('profile'),
  users:        config.mix('users'),
  statistics:   config.mix('statistics'),
  redirection:  config.mix('redirection')
};

// Format for grunt task config.
function getRequireConf() {
  var returnObj = {};
  Object.keys(_config).forEach(function(key) {
    returnObj[key] = {
      compile: {
        options: _config[key]
      }
    };
  });
  return returnObj;
}

var requirejsConf = getRequireConf();

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({

    tempDirWidget: 'web/js/widget',
    buildDirWidget: 'src/Lily/AppBundle/Resources/views',

    snippetFooter: grunt.file.read('web/js/widget/snippet.footer.js'),

    requireMulti: requirejsConf,

    clean: {
      app: 'web/js-build',
      widget: 'web/js/widget/build',
    },

    jshint: {
      all: [
        'gruntfile.js',
        'web/js/**/*.js',
        '!web/js/bower_components/**/*.js',
        '!web/js/libs/**/*.js',
        '!web/js/utils/**/*.js',
        '!web/js/ie/**/*.js',
        '!web/js/facebook/**/*.js'
      ],
      widget: [
        'web/js/widget/*.js',
        '!web/js/widget/build/*.js',
        '!web/js/widget/snippet*.js'
      ]
    },

    requirejs: {
      compile: {
        options: '<%= moduleConf %>'
      }
    },

    concat: {
      snippet: {
        banner: '(function (window, document, undefined) {' +
          '"use strict";',
        footer: '})(this, document);',
        src: ['<%= tempDirWidget %>/build/snippet.js', '<%= tempDirWidget %>/snippet.footer.js'],
        dest: '<%= tempDirWidget %>/build/snippet.js',
      },
    },

    uglify: {

      widget: {
        options: {
          beautify: true,
          mangle: false,
          compress: false,
          banner: '(function (window, document, undefined) {' +
            '"use strict";',
          footer: '})(this, document);',
        },
        src: '<%= tempDirWidget %>/build/loader.js',
        dest: '<%= buildDirWidget %>/loader.js.twig',
      },

      widgetMin: {
        options: {
          mangle: true,
          compress: {},
          banner: '(function (window, document, undefined) {' +
            '"use strict";',
          footer: '})(this, document);',
        },
        src: '<%= tempDirWidget %>/build/loader.js',
        dest: '<%= buildDirWidget %>/loader.js.twig',
      },

      snippet: {
        options: {
          beautify: true,
          mangle: true,
          compress: false,
          footer: '<%= snippetFooter %>',
        },
        src: '<%= tempDirWidget %>/snippet.js',
        dest: '<%= tempDirWidget %>/build/snippet.js',
      },

      snippetMin: {
        options: {
          mangle: {
            except: ['undefined']
          },
          compress: {},
          footer: '<%= snippetFooter %>',
        },
        src: '<%= tempDirWidget %>/snippet.js',
        dest: '<%= tempDirWidget %>/build/snippet.min.js'
      }

    },

    replace: {
      snippet: {
        options: {
          patterns: [
            {
              match: 'snippetFooter',
              replacement: '<%= snippetFooter %>'
            }
          ]
        },
        files: [
          {
            src: ['<%= tempDirWidget %>/build/snippet.js'],
            dest: '<%= tempDirWidget %>/build/snippet.js'
          }
        ]
      },

      snippetMin: {
        options: {
          patterns: [
            {
              match: 'snippetFooter',
              replacement: '<%= snippetFooter %>'
            }
          ]
        },
        files: [
          {
            src: ['<%= tempDirWidget %>/build/snippet.min.js'],
            dest: '<%= tempDirWidget %>/build/snippet.min.js'
          }
        ]
      }
    },

    copy: {
      snippet: {
        src: '<%= tempDirWidget %>/build/snippet.js',
        dest: '<%= buildDirWidget %>/snippet.js.twig'
      },

      snippetMin: {
        src: '<%= tempDirWidget %>/build/snippet.min.js',
        dest: '<%= buildDirWidget %>/snippet.js.twig'
      }
    },

    // Let's not use css tasks for now, until we have
    // a proper build folder for assets (images, fonts, css && js)
    cssmin: {
      compile: {
        files: {
          cwd: 'web/css',
        }
      }
    },

    autoprefixer: {
      options: {
        // We need to `freeze` browsers versions for testing purposes.
        browsers: ['last 2 versions', '> 5%', 'IE 10', 'ChromeAndroid > 1', 'iOS > 6', 'Android >  4'],
        expand: true,
        flatten: true,
        src: 'web/css/**/*.css',
      }
    },

    hashres: {
      // Global options
      options: {
        // Optional. Encoding used to read/write files. Default value 'utf8'
        encoding: 'utf8',
        // Optional. Format used to name the files specified in 'files' property.
        // Default value: '${hash}.${name}.cache.${ext}'
        fileNameFormat: '${name}.${ext}?${hash}',
        // Optional. Should files be renamed or only alter the references to the files
        // Use it with '${name}.${ext}?${hash} to get perfect caching without renaming your files
        // Default value: true
        renameFiles: false
      },
      // hashres is a multitask. Here 'prod' is the name of the subtask. You can have as many as you want.
      prod: {
        options: {
          rename: true
        },
        // Files to hash
        src: [
          // WARNING: These files will be renamed!
          'web/js-build/chat/main.js',
          'web/js-build/config/main.js',
          'web/js-build/dashboard/main.js',
          'web/js-build/faq/main.js',
          'web/js-build/front/main.js',
          'web/js-build/knowledge/main.js',
          'web/js-build/profile/main.js',
          'web/js-build/redirection/main.js',
          'web/js-build/statistics/main.js',
          'web/js-build/users/main.js',
          'web/js-build/common.js',
          'web/js-build/chatComp.js'
        ],
        // File that refers to above files and needs to be updated with the hashed name
        dest: [
          'src/Lily/AppBundle/Resources/views/themes/lily/index.html.twig',
          'src/Lily/ChatBundle/Resources/views/index.html.twig',
          'src/Lily/BackOfficeBundle/Resources/views/Config/index.html.twig',
          'src/Lily/BackOfficeBundle/Resources/views/Dashboard/index.html.twig',
          'src/Lily/BackOfficeBundle/Resources/views/Faq/index.html.twig',
          'src/Lily/BackOfficeBundle/Resources/views/Redirections/index.html.twig',
          'src/Lily/KnowledgeBundle/Resources/views/index.html.twig',
          'src/Lily/StatisticsBundle/Resources/views/Statistics/index.html.twig',
          'src/Lily/UserBundle/Resources/views/Profile/index.html.twig',
          'src/Lily/UserBundle/Resources/views/Admin/index.html.twig'
        ]
      },

      // For dev env to work (require to match the appropriate files), clean up all hash in paths.
      dev: {
        options: {
          fileNameFormat: '${name}.${ext}',
          rename: true
        },
        // Files to hash
        src: [
          // WARNING: These files will be renamed!
          'web/js/backoffice/chat/main.js',
          'web/js/backoffice/config/main.js',
          'web/js/backoffice/dashboard/main.js',
          'web/js/backoffice/faq/main.js',
          'web/js/backoffice/front/main.js',
          'web/js/backoffice/knowledge/main.js',
          'web/js/backoffice/profile/main.js',
          'web/js/backoffice/redirection/main.js',
          'web/js/backoffice/statistics/main.js',
          'web/js/backoffice/users/main.js',
          'web/js/backoffice/common.js',
          'web/js/backoffice/chatComp.js',
          'web/js-build/chat/main.js',
          'web/js-build/config/main.js',
          'web/js-build/dashboard/main.js',
          'web/js-build/faq/main.js',
          'web/js-build/front/main.js',
          'web/js-build/knowledge/main.js',
          'web/js-build/profile/main.js',
          'web/js-build/redirection/main.js',
          'web/js-build/statistics/main.js',
          'web/js-build/users/main.js',
          'web/js-build/common.js',
          'web/js-build/chatComp.js'
        ],
        // File that refers to above files and needs to be updated with the hashed name
        dest: [
          'src/Lily/AppBundle/Resources/views/themes/Lily/index.html.twig',
          'src/Lily/ChatBundle/Resources/views/index.html.twig',
          'src/Lily/BackOfficeBundle/Resources/views/Config/index.html.twig',
          'src/Lily/BackOfficeBundle/Resources/views/Dashboard/index.html.twig',
          'src/Lily/BackOfficeBundle/Resources/views/Faq/index.html.twig',
          'src/Lily/BackOfficeBundle/Resources/views/Redirections/index.html.twig',
          'src/Lily/KnowledgeBundle/Resources/views/index.html.twig',
          'src/Lily/StatisticsBundle/Resources/views/Statistics/index.html.twig',
          'src/Lily/UserBundle/Resources/views/Profile/index.html.twig',
          'src/Lily/UserBundle/Resources/views/Admin/index.html.twig'
        ]
      },
    },

    karma: {
      test: {
        configFile: 'karma.conf.js',
      },

      build: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS'],
      }
    },

    webpack: {
      widget: {
        entry: './<%= tempDirWidget %>/main.js',
        output: {
          path: '<%= tempDirWidget %>/build/',
          filename: 'loader.js',
        },
        resolve: {
          modulesDirectories: ['web_modules', 'node_modules', 'bower_components']
        }
      }
    },

    watch: {
      default: {
        files: ['web/js/widget/**.js'],
        tasks: [
          'webpack:widget',
          'uglify:widget'
        ],
        options: {
          spawn: false,
        },
      },
    },

  });

  // Load tasks from NPM
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-umd');

  // requirejs is not a multi task. Emulate that by running requirejs task for each module in config
  // or one by one using multi task format (ex: grunt requireMulti:front)
  grunt.registerMultiTask('requireMulti', 'Run require optimizer across the project', function() {
    grunt.log.write('\nCompiling ' + this.target + '\n');
    grunt.config.set('moduleConf', this.data.compile.options);
    grunt.task.run('requirejs');
  });

  grunt.registerTask('check', ['jshint']);
  grunt.registerTask('cacheBust', ['hashres:prod']);
  grunt.registerTask('cleanDevRefs', ['hashres:dev']);

  grunt.registerTask('devFront', [
    'clean:app',
    'cleanDevRefs'
  ]);

  // Default task. Compile all modules
  grunt.registerTask('buildFront', ['requireMulti:front', 'cacheBust']);
  grunt.registerTask('buildChat', ['requireMulti:chatComp', 'cacheBust']);
  grunt.registerTask('buildLibs', ['requireMulti:common', 'cacheBust']);
  grunt.registerTask('buildBo', [
    'requireMulti:chat',
    'requireMulti:config',
    'requireMulti:dashboard',
    'requireMulti:profile',
    'requireMulti:statistics',
    'requireMulti:knowledge',
    'requireMulti:users',
    'requireMulti:faq',
    'cacheBust'
  ]);

  grunt.registerTask('devSnippet', [
    'uglify:snippet',
    'replace:snippet',
    'copy:snippet',
  ]);

  grunt.registerTask('buildSnippet', [
    'uglify:snippetMin',
    'replace:snippetMin',
    'copy:snippetMin',
  ]);

  grunt.registerTask('devWidget', [
    'jshint:widget',
    'webpack:widget',
    'uglify:widget',
    'watch',
  ]);

  grunt.registerTask('buildWidget', [
    'webpack:widget',
    'uglify:widgetMin',
  ]);

  grunt.registerTask('test', [
    'karma:test'
  ]);

  grunt.registerTask('build', [
    'clean',
    'karma:build',
    'requireMulti',
    'cacheBust',
    'buildSnippet',
    'buildWidget',
  ]);
};
