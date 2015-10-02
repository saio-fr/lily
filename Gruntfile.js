/*global module:false, require:true*/
'use strict';

var config = require('./buildConfig');
var configV1 = require('./buildConfig.v1');

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

var _configV1 =  {
  front:        configV1.mix('front'),
  common:       configV1.mix('common'),
  chatComp:     configV1.mix('chatComp'),
  dashboard:    configV1.mix('dashboard'),
  config:       configV1.mix('config'),
  chat:         configV1.mix('chat'),
  faq:          configV1.mix('faq'),
  knowledge:    configV1.mix('knowledge'),
  profile:      configV1.mix('profile'),
  users:        configV1.mix('users'),
  statistics:   configV1.mix('statistics'),
  redirection:  configV1.mix('redirection')
};

// Format for grunt task config.
function getRequireConf(conf) {
  var returnObj = {};
  Object.keys(conf).forEach(function(key) {
    returnObj[key] = {
      compile: {
        options: conf[key]
      }
    };
  });
  return returnObj;
}

var requirejsConf = getRequireConf(_config);
var requirejsConfV1 = getRequireConf(_configV1);

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({

    iniDirJs: 'web/js/',
    buildDirJs: 'web/build/js',

    destDirLoader: 'src/Lily/AppBundle/Resources/views',

    snippetFooter: grunt.file.read('web/js/snippet/snippet.footer.js'),

    requireMulti: requirejsConf,
    requireMultiV1: requirejsConfV1,

    clean: {
      app: 'web/build/js',
      loader: 'web/build/js/loader',
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
      loader: ['web/js/loader/*.js'],
      widget: ['web/js/widget/*.js'],
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
        src: ['<%= buildDirJs %>/snippet/snippet.js', '<%= iniDirJs %>/snippet/snippet.footer.js'],
        dest: '<%= buildDirJs %>/snippet/snippet.js',
      },
    },

    uglify: {

      loader: {
        options: {
          beautify: true,
          mangle: false,
          compress: false,
          banner: '(function (window, document, undefined) {' +
            '"use strict";',
          footer: '})(this, document);',
        },
        src: '<%= buildDirJs %>/loader/loader.js',
        dest: '<%= destDirLoader %>/loader.js.twig',
      },

      loaderMin: {
        options: {
          mangle: true,
          compress: {},
          banner: '(function (window, document, undefined) {' +
            '"use strict";',
          footer: '})(this, document);',
        },
        src: '<%= buildDirJs %>/loader/loader.js',
        dest: '<%= destDirLoader %>/loader.js.twig',
      },

      snippet: {
        options: {
          beautify: true,
          mangle: true,
          compress: false,
          footer: '<%= snippetFooter %>',
        },
        src: '<%= iniDirJs %>/snippet/snippet.js',
        dest: '<%= buildDirJs %>/snippet/snippet.js',
      },

      snippetMin: {
        options: {
          mangle: {
            except: ['undefined']
          },
          compress: {},
          footer: '<%= snippetFooter %>',
        },
        src: '<%= iniDirJs %>/snippet/snippet.js',
        dest: '<%= buildDirJs %>/snippet/snippet.min.js'
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
            src: ['<%= buildDirJs %>snippet/snippet.js'],
            dest: '<%= buildDirJs %>snippet/snippet.js'
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
            src: ['<%= buildDirJs %>/snippet/snippet.min.js'],
            dest: '<%= buildDirJs %>/snippet/snippet.min.js'
          }
        ]
      }
    },

    copy: {
      snippet: {
        src: '<%= buildDirJs %>/snippet/snippet.js',
        dest: '<%= destDirLoader %>/snippet.js.twig'
      },

      snippetMin: {
        src: '<%= buildDirJs %>/snippet/snippet.min.js',
        dest: '<%= destDirLoader %>/snippet.js.twig'
      },

      fonts: {
        expand: true,
        cwd: 'web/css/font/',
        src: '**',
        dest: 'web/build/css/font/'
      }
    },

    // Let's not use css tasks for now, until we have
    // a proper build folder for assets (images, fonts, css && js)
    cssmin: {
      compile: {
        files: [{
          expand: true,
          processImportFrom: ['!fonts.googleapis.com'],
          processImport: false,
          cwd: 'web/css',
          src: ['*/**.css', '!*.min.css'],
          dest: 'web/build/css',
        }]
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
          'web/build/js/chat/main.js',
          'web/build/js/config/main.js',
          'web/build/js/dashboard/main.js',
          'web/build/js/faq/main.js',
          'web/build/js/front/main.js',
          'web/build/js/knowledge/main.js',
          'web/build/js/profile/main.js',
          'web/build/js/redirection/main.js',
          'web/build/js/statistics/main.js',
          'web/build/js/users/main.js',
          'web/build/js/common.js',
          'web/build/js/chatComp.js',
          'web/build/css/*.css'
        ],
        // File that refers to above files and needs to be updated with the hashed name
        dest: [
          'src/Lily/AppBundle/Resources/views/themes/lily/index.html.twig',
          'src/Lily/AppBundle/Resources/views/themes/widget/index.html.twig',
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
          'web/build/js/chat/main.js',
          'web/build/js/config/main.js',
          'web/build/js/dashboard/main.js',
          'web/build/js/faq/main.js',
          'web/build/js/front/main.js',
          'web/build/js/knowledge/main.js',
          'web/build/js/profile/main.js',
          'web/build/js/redirection/main.js',
          'web/build/js/statistics/main.js',
          'web/build/js/users/main.js',
          'web/build/js/common.js',
          'web/build/js/chatComp.js',
          'web/build/css/*.css',
        ],
        // File that refers to above files and needs to be updated with the hashed name
        dest: [
          'src/Lily/AppBundle/Resources/views/themes/widget/index.html.twig',
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
      loader: {
        entry: './<%= iniDirJs %>/loader/main.js',
        output: {
          path: '<%= buildDirJs %>/loader/',
          filename: 'loader.js',
        },
        resolve: {
          modulesDirectories: ['web_modules', 'node_modules', 'bower_components']
        }
      },

      widget: {
        entry: './<%= iniDirJs %>/widget/main.js',
        output: {
          path: '<%= buildDirJs %>/widget/',
          filename: 'main.js',
        },
        resolve: {
          modulesDirectories: ['web_modules', 'node_modules', 'bower_components']
        }
      }
    },

    watch: {
      default: {
        files: [
          'web/js/loader/**/*.js',
          'web/js/widget/**/*.js'
        ],
        tasks: [
          'webpack:loader',
          'webpack:widget',
          'uglify:loader',
          'cssmin:compile',
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

  grunt.registerMultiTask('requireMultiV1', 'Run require optimizer across the project', function() {
    grunt.log.write('\nCompiling ' + this.target + '\n');
    grunt.config.set('moduleConf', this.data.compile.options);
    grunt.task.run('requirejs');
  });

  grunt.registerTask('check', ['jshint']);
  grunt.registerTask('cacheBust', ['hashres:prod']);
  grunt.registerTask('cleanDevRefs', ['hashres:dev']);

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

  grunt.registerTask('devFront', [
    'clean:app',
    'cleanDevRefs'
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

  grunt.registerTask('devLoader', [
    'jshint:loader',
    'webpack:loader',
    'uglify:loader',
    'watch',
  ]);

  grunt.registerTask('buildLoader', [
    'webpack:loader',
    'uglify:loaderMin',
  ]);

  grunt.registerTask('devWidget', [
    'jshint:loader',
    'webpack:widget',
    'cssmin:compile',
    'copy:fonts',
    'watch',
  ]);

  grunt.registerTask('buildWidget', [
    'webpack:widget',
    'cssmin:compile',
    'copy:fonts',
  ]);

  grunt.registerTask('test', [
    'karma:test'
  ]);

  grunt.registerTask('build', [
    'clean',
    'karma:build',
    'requireMultiV1',
    'requireMulti',
    'copy:fonts',
    'cssmin:compile',
    'cacheBust',
    'buildSnippet',
    'buildLoader',
  ]);
};
