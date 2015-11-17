module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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
                script: 'index.js'
            }
        },

        uglify: {
            my_target: {
                files: {
                    'public/dist/client_min.js': ['public/client/*.js']
                }
            }
        },

        jshint: {
            files: [
                'public/client/*.js',
            ],
            options: {
                asi: 'true',
            }
            // options: {
            //   force: 'true',
            //   jshintrc: '.jshintrc',
            //   ignores: [
            //     'public/lib/**/*.js',
            //     'public/dist/**/*.js'
            //   ]
            // }
        },
        cssmin: {
            target: {
                files: {
                    'public/dist/style_min.css': ['public/style.css']
                }
            }
        },
        csslint: {
            // strict: {
            //     options: {
            //         import: 2
            //     },
            //     src: ['public/dist/style_min.css']
            // },
            lax: {
                options: {
                    import: false
                },
                src: ['public/dist/style_min.css']
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
            options: {
                stderr: true,
                stdout: true
            },
            multiple: {
              command: [
                'git add .',
                'git commit -m "deploying changes"',
                'git push heroku master',
                'git push origin master'
              ].join('&&')
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('server-dev', function(target) {
        // Running nodejs in a different process and displaying output on the main console
        var nodemon = grunt.util.spawn({
            cmd: 'grunt',
            grunt: true,
            args: 'nodemon'
        });
        nodemon.stdout.pipe(process.stdout);
        nodemon.stderr.pipe(process.stderr);

        grunt.task.run(['watch']);
    });

    ////////////////////////////////////////////////////
    // Main grunt tasks
    ////////////////////////////////////////////////////

    grunt.registerTask('test', [
        'mochaTest'
    ]);

    grunt.registerTask('build', [
        'uglify',
        'cssmin',
        'jshint',
        'csslint',
        'mochaTest'
    ]);
    // grunt.registerTask('shell', ['shell']);
    grunt.registerTask('upload', function(n) {
        if (grunt.option('prod')) {
            grunt.task.run(['shell']);
        } else {
            grunt.task.run(['server-dev']);
        }
    });

    grunt.registerTask('deploy', [
        'build',
        'upload'
    ]);
    // grunt.registerTask('heroku:production', 'uglify cssmin jshint csslint mochaTest');
};