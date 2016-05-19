module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      js: {   
        src: ['./public/client/app.js',
              './public/client/link.js',
              './public/client/links.js',
              './public/client/linkView.js',
              './public/client/linksView.js',
              './public/client/createLinkView.js',
              './public/client/router.js'],
        dest: './public/dist/concat.js'
      },
      css: {
        src: ['./public/*.css'],
        dest: './public/dist/concat.css'
      },
      lib: {
        src: ['./public/lib/**/*.js', 
              '!./public/lib/backbone.js', './public/lib/backbone.js', 
              '!./public/lib/handlebars.js', './public/lib/handlebars.js'],
        dest: './public/dist/lib.concat.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      my_target: {
        // dest: './public/dist/concat.min.js'
        files: {
          './public/dist/concat.min.js': ['./public/dist/concat.js']
        }
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
        './public/client/**/*.js',
        './public/lib/**/*.js'
      ]
    },

    cssmin: {
      css: {
        src: './public/dist/concat.css',
        dest: './public/dist/concat.min.css'
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      // prodServer: {
      //   command: ['git add .',
      //             'git commit',
      //             'git push live master'].join('&&')
      // }
      pushServer: {
        command: 'git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  grunt.fail.warn("Error!!");
  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'eslint',
    'concat',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
      grunt.task.run(['shell']);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', function (n) {
      grunt.task.run(['build', 'upload']);
  });

  grunt.registerTask('default', [
    'concat',
    'uglify',
    'cssmin',
    'eslint',
    'watch'
  ]);
};
