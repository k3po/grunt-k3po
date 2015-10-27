/*
 * grunt-k3po
 * https://github.com/kaazing/grunt-k3po
 *
 * Copyright (c) 2014 Kaazing
 * Licensed under the APACHE 2 license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Configuration to be run (and then tested).
        k3po: {
            start: {
                options: {
                    goal: "start"
                }
            },
            stop: {
                options: {
                    goal: "stop"
                }
            },
            daemon: {
                options: {
                    goal: "start",
                    daemon: false
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir,
    // then start k3po with this plugin
    // then run the tests
    // then stop k3po with this plugin
    // grunt.registerTask('test', ['k3po:start', 'nodeunit', 'k3po:stop']);
    grunt.registerTask('test', ['k3po:start', 'k3po:stop']);

    grunt.registerTask('runRobot', ['k3po:daemon']);
    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
