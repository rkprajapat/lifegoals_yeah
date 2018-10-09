/*global module:false*/
module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    injector: {
      options: {

      },

      // Inject application script files into index.html (doesn't include bower)
      scripts: {
        options: {
          transform: function(filePath) {
            // filePath = filePath.replace('/client/', '');
            // filePath = filePath.replace('/.tmp/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          'templates/index.html': [
               '!{static}/**/*.spec.js',
               '!{static}/**/*.mock.js']
        }
      },
      // Inject component less into app.less
      // less: {
      //   options: {
      //     transform: function(filePath) {
      //       // filePath = filePath.replace('/client/app/', '');
      //       // filePath = filePath.replace('/client/components/', '');
      //       return '@import \'' + filePath + '\';';
      //     },
      //     starttag: '// injector',
      //     endtag: '// endinjector'
      //   },
      //   files: {
      //     '<%= yeoman.client %>/app/app.less': [
      //       '<%= yeoman.client %>/{app,components}/**/*.less',
      //       '!<%= yeoman.client %>/app/app.less'
      //     ]
      //   }
      // },
      // Inject component css into index.html
      css: {
        options: {
          transform: function(filePath) {
            // filePath = filePath.replace('/client/', '');
            // filePath = filePath.replace('/.tmp/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          'templates/index.html': [
            '{static}/**/*.css'
          ]
        }
      }
    },


    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    copy: {
        font_awesome: {
            expand: true,
            flatten: true,
            src: ['bower_components/font-awesome/fonts/*'],
            dest: 'fonts'
        }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      },
      injectJS: {
        files: [
          '{static}/**/*.js',
          '!{static}/**/*.spec.js',
          '!{static}/**/*.mock.js'
        ],
        tasks: ['injector:scripts']
      },
      injectCss: {
        files: [
          '{static}/**/*.css'
        ],
        tasks: ['injector:css']
      }
    },
    // Automatically inject Bower components into the app
    wiredep: {
      target: {
        src: 'templates/index.html',
        // ignorePath: '<%= yeoman.client %>/',
        exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css/ ]
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-asset-injector');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify','injector','wiredep','copy']);

};
