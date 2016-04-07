/*global module, require */
module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        local: grunt.file.readJSON('properties.local.json'),
        prod: grunt.file.readJSON('properties.prod.json'),

        paths: {
            dev: 'dev',
            app: 'html',
        },

        libs: [
            '<%= paths.dev %>/js/libs/angular.min.js',
            '<%= paths.dev %>/js/libs/angular-ui-router.min.js',
            '<%= paths.dev %>/js/libs/angular-cookies.min.js',
            '<%= paths.dev %>/js/libs/angular-carousel.min.js',
            '<%= paths.dev %>/js/libs/angular-touch.min.js'
        ],

        jshint: {
            gruntfile: 'Gruntfile.js',
            app: ['<%= paths.dev %>/js/app/**/*.js', '!<%= paths.dev %>/js/app/config/constants.js'],
            specs: ['<%= paths.dev %>/js/tests/**/*.js'],
            globals: {
                "module": false,
                "require":false
            },
            options: {
                jshintrc: true
            }
        },

        clean: {
            options: {
                force: true /* Need force to clean beyond current working dir */
            },
            js: {
                src: ['<%= paths.app %>/assets/js/**/*']
            },
            css: {
                src: ['<%= paths.app %>/assets/css/**/*']
            },
            images: {
                src: ['<%= paths.app %>/assets/images/**/*']
            },
            fonts: {
                src: ['<%= paths.app %>/assets/fonts/**/*']
            },
            root: {
                src: ['<%= paths.app %>/*.png', '<%= paths.app %>/*.txt', '<%= paths.app %>/*.ico']
            },
            html: {
                src: ['<%= paths.app %>/*.html', '!<%= paths.app %>/assets/**', '!<%= paths.app %>/templates/**']
            },
            templates: {
                src: ['<%= paths.app %>/templates/*']
            },
            appjs: {
                src: ['<%= paths.app %>/assets/js/**/*', '!<%= paths.app %>/assets/js/app.min.js', '!<%= paths.app %>/assets/js/libs.min.js', '!<%= paths.app %>/assets/js/app.js']
            },
            api: {
                src: ['<%= paths.app %>/api/**/*']
            }
        },

        sass: {
            options: {
                trace: true
            },
            prod: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    src: ['**/*.scss', '!**/_*.scss'],
                    cwd: '<%= paths.dev %>/scss',
                    dest: '<%= paths.app %>/assets/css',
                    ext: '.css'
                }]
            }
        },

        watch: {
            options: {
                livereload: true
            },
            scss: {
                files: ['<%= paths.dev %>/scss/*.scss'],
                tasks: ['scss']
            },
            js: {
                files: ['<%= paths.dev %>/js/**/*.js'],
                tasks: ['js', 'build-local']
            },
            html: {
                files: ['<%= paths.dev %>/src/index.html'],
                tasks: ['html']
            },
            templates: {
                files: ['<%= paths.dev %>/src/templates/**/*.html'],
                tasks: ['templates']
            },
            images: {
                files: ['<%= paths.dev %>/images/**/*'],
                tasks: ['images']
            },
            api: {
                files: ['<%= paths.dev %>/api/**/*'],
                tasks: ['api']
            }
        },

        uglify: {
            options: {
                message: 'We are now ugly',

                // mangle: Turn on or off mangling
                mangle: false,

                // beautify: beautify your code for debugging/troubleshooting purposes
                beautify: false,

                // compress: compresses the code into one
                compress: {},
            },
            appjs: {
                src: [
                    '<%= paths.app %>/assets/js/app/app.js',
                    '<%= paths.app %>/assets/js/app/config/routes.js',
                    '<%= paths.app %>/assets/js/app/config/run.js',
                    '<%= paths.app %>/assets/js/app/config/constants.js',
                    '<%= paths.app %>/assets/js/services.js',
                    '<%= paths.app %>/assets/js/controllers.js',
                    '<%= paths.app %>/assets/js/directives.js'
                ],
                dest: '<%= paths.app %>/assets/js/app.min.js'
            }
        },

        concat: {
            libs: {
                files: {
                    '<%= paths.app %>/assets/js/libs.min.js': '<%= libs%>'
                }
            },
            controllers: {
                expand: true,
                files: {
                    '<%= paths.app %>/assets/js/controllers.js': ['<%= paths.dev %>/js/app/controllers/*.js']
                }
            },
            directives: {
                expand: true,
                files: {
                    '<%= paths.app %>/assets/js/directives.js': ['<%= paths.dev %>/js/app/directives/**/*.js']
                }
            },
            services: {
                expand: true,
                files: {
                    '<%= paths.app %>/assets/js/services.js': ['<%= paths.dev %>/js/app/services/*.js']
                }
            }
        },

        copy: {
            app: {
                expand: true,
                cwd: '<%= paths.dev %>/js/app/',
                src: ['**'],
                dest: '<%= paths.app %>/assets/js/app/'
            },
            html: {
                src: ['<%= paths.dev %>/src/index.html'],
                dest: '<%= paths.app %>/index.html'
            },
            templates: {
                expand: true,
                cwd: '<%= paths.dev %>/src/templates/',
                src: ['**'],
                dest: '<%= paths.app %>/templates/'
            },
            images: {
                expand: true,
                cwd: '<%= paths.dev %>/images/',
                src: ['**'],
                dest: '<%= paths.app %>/assets/images/'
            },
            fonts: {
                expand: true,
                cwd: '<%= paths.dev %>/fonts/',
                src: ['**'],
                dest: '<%= paths.app %>/assets/fonts/'
            },
            root: {
                expand: true,
                cwd: '<%= paths.dev %>/root/',
                src: ['**'],
                dest: '<%= paths.app %>/'
            },
            api: {
                expand: true,
                cwd: '<%= paths.dev %>/api/',
                src: ['**'],
                dest: '<%= paths.app %>/api/'
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 version', '> 1%', 'ff esr', 'ie >= 8', 'ios >= 5', 'android >= 2.3'],
                map: false
            },
            site: {
                src: '<%= paths.app %>/assets/css/styles.css'
            }
        },

        connect: {
            dev: {
                options: {
                    port: 3000,
                    base: './html',
                    hostname: '0.0.0.0'
                }
            }
        },

        replace: {
            local: {
                options: {
                    patterns: [
                        {
                            match: 'env',
                            replacement: '<%= local.env %>'
                        },
                        {
                            match: 'service_url',
                            replacement: '<%= local.service_url %>'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['dev/js/app/config/constants.js'],
                        dest: 'html/assets/js/app/config/'
                    }
                ]
            },
            prod: {
                options: {
                    patterns: [
                        {
                            match: 'env',
                            replacement: '<%= prod.env %>'
                        },
                        {
                            match: 'service_url',
                            replacement: '<%= prod.service_url %>'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['dev/js/app/config/constants.js'],
                        dest: 'html/assets/js/app/config/'
                    }
                ]
            }
        }

    });

    grunt.registerTask('test', ['jshint', 'karma:unit']);
    grunt.registerTask('build-local', ['replace:local', 'uglify:appjs', 'clean:appjs']);
    grunt.registerTask('js', ['jshint', 'clean:js', 'concat:libs', 'concat:controllers', 'concat:directives', 'concat:services', 'copy:app']);
    grunt.registerTask('scss', ['clean:css', 'sass:prod', 'autoprefixer:site']);
    grunt.registerTask('fonts', ['clean:fonts', 'copy:fonts']);
    grunt.registerTask('images', ['clean:images', 'copy:images']);
    grunt.registerTask('root', ['clean:root', 'copy:root']);
    grunt.registerTask('api', ['clean:api', 'copy:api']);
    grunt.registerTask('html', ['clean:html', 'copy:html']);
    grunt.registerTask('templates', ['clean:templates', 'copy:templates']);

    grunt.registerTask('dev', ['js', 'build-local', 'scss', 'images', 'fonts', 'html', 'templates', 'root', 'api', 'watch']);

    // Targets
    grunt.registerTask('default', ['js', 'build-local', 'scss', 'images', 'fonts', 'html', 'templates', 'root', 'api']);

};