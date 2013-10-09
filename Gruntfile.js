module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: grunt.file.readJSON('bower.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; \n*/\n',

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['public/js/backbone-command/**/*.js'],
                dest: '<%= pkg.name %>.js'
            }
        },

        uglify: {
            dist: {
                files: {
                    '<%= pkg.name %>.min.js': '<%= pkg.name %>.js'
                },
                options: {
                    banner: '<%= banner %>'
                }
            }
        },

        copy: {
            backboneCommand: {
                src: ['<%= pkg.name %>.js', '<%= pkg.name %>.min.js'],
                dest: 'public/js/dist/'
            }
        },

        watch: {
            files: ['public/js/*.js'],
            tasks: ['concat:dist', 'uglify:dist', 'copy:backboneCommand']
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ["pkg", "banner"],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json', 'bower.json', '<%= pkg.name %>.min.js', '<%= pkg.name %>.js', 'public/js/dist/<%= pkg.name %>.min.js', 'public/js/dist/<%= pkg.name %>.js'], // '-a' for all files
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin master',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
            }
        },

        jasmine: {
            components: {
                src: [
                    'public/js/backbone-command/*js'
                ],
                options: {
                    specs: 'spec/*Spec.js',
                    keepRunner: true,
                    vendor: [
                        'public/js/vendors/jquery/jquery.min.js',
                        'public/js/vendors/underscore/underscore-min.js',
                        'public/js/vendors/backbone/backbone-min.js',
                        'public/js/vendors/injector.js/injector-js.min.js'
                    ]
                }
            }
        }
    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-bump');

    // tasks
    grunt.registerTask('default', ['concat', 'uglify', 'copy']);

    grunt.registerTask('release', ['default', 'bump-commit']);
    grunt.registerTask('release:patch', ['bump-only:patch', 'release']);
    grunt.registerTask('release:minor', ['bump-only:minor', 'release']);
    grunt.registerTask('release:major', ['bump-only:major', 'release']);

    // travis!
    grunt.registerTask('travis', [
//        'jshint', TODO maybe implement jshint for strict coding?
        'jasmine'
    ]); 
};