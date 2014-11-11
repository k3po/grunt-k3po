/*
 * grunt-k3po
 * https://github.com/kaazing/grunt-k3po
 *
 * Copyright (c) 2014 David Witherspoon
 * Licensed under the APACHE 2 license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask('k3po', 'Plugin to utilize k3po (https://github.com/kaazing/robot) from grunt builds', function () {
        var options = this.options({
            daemon: true,
            uri: "tcp://localhost:11642",
            verbose: false,
            scripts: "test/scripts",
            goal: "start"
        });

        var done = this.async();

        var fs = require('fs');
        var java = require("java");
        var mvn = require('node-java-maven');

        mvn(function (err, mvnResults) {
            if (err) {
                return console.error('could not resolve maven dependencies', err);
            }
            mvnResults.classpath.forEach(function (c) {
                java.classpath.push(c);
            });

            if (options.goal === "start") {

                var javaClassLoader = null;
                if (fs.existsSync(options.scripts)) {
                    // add local scripts to path
                    var javaFile = java.newInstanceSync('java.io.File', options.scripts);
                    var javaURL = javaFile.getAbsoluteFileSync().toURISync().toURLSync();
                    var javaURLArray = java.newArray("java.net.URL", [javaURL]);
                    javaClassLoader = java.newInstanceSync('java.net.URLClassLoader', javaURLArray);
                } else {
                    var javaThread = java.callStaticMethodSync("java.lang.Thread", "currentThread");
                    javaClassLoader = javaThread.getContextClassLoaderSync();
                }

                var javaURI = java.callStaticMethodSync("java.net.URI", "create", options.uri);
                var javaRobotServer = java.newInstanceSync("org.kaazing.robot.driver.RobotServer", javaURI, options.verbose, javaClassLoader);

                grunt.log.writeln("Starting Robot");
                javaRobotServer.startSync();
                grunt.log.writeln("Robot Started");

                // If it is not a daemon leave running forever, (exit Ctr-C)
                if (!options.daemon) {
                    // need something running, else it terminates...
                    grunt.log.writeln("Robot running, ctrl-C to exit");
                    setInterval(function () {
                        grunt.log.writeln('kaAmazing! you left it running for at least 24.8551 Days!');
                    }, 2147483647);
                } else {
                    grunt.config.set("RobotServer", javaRobotServer);
                    done();
                }
            } else if (options.goal === "stop") {
                var javaRobotServerToShutdown = grunt.config.get(['RobotServer']);
                grunt.log.writeln("Stopping Robot");
                /*
                 TODO, for now it will just hard stop after end of grunt by making assumptions on the usage,
                 the following is the cause of the error
                 Assertion failed: (handle->InternalFieldCount() > 0), function Unwrap, file ~/Users/User/.node-gyp/0.10.33/src/node_object_wrap.h, line 61.
                 */
//                javaRobotServerToShutdown.stop(done);
//                grunt.log.writeln("The stop goal currently is not functioning because of a bug propagating from:" +
//                    "Assertion failed: (handle->InternalFieldCount() > 0), function Unwrap, file ~/Users/User/.node" +
//                    "-gyp/0.10.33/src/node_object_wrap.h, line 61.");
                grunt.log.writeln("Stopped Robot");

            } else {
                grunt.fail.fatal("goal " + options.goal + " not recognized, failing process");
            }

        });
    });

};
