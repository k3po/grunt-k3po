'use strict';

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.k3p0 = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    testConnectSendEmptyScript: function (test) {
        var done = test.done;

        test.expect(3);
        console.log("testConnectSendEmptyScript");
        var net = require('net');

        var client = net.connect({port: 11642},
            function () { //'connect' listener
                console.log("Client Connected");
                console.log("Writing Prepare");
                client.write("PREPARE\n");
                client.write("version:2.0\n");
                client.write("\n");
            });

        var expectedPrepared = "PREPARED\n" +
            "content-length:0\n" +
            "\n";

        var expectedStarted = "STARTED\n" +
            "\n";

        var expectedFinished = "FINISHED\n" +
            "content-length:0\n" +
            "\n";

        client.on('data', function (data) {
            var actualMessage = data.toString();
            if (actualMessage === expectedPrepared) {
                console.log("Client received prepared");
                test.equal(actualMessage, expectedPrepared);
                console.log("Client sending start");
                client.write("START\n" +
                    "\n");
            } else if (actualMessage === expectedStarted) {
                console.log("Client received started");
                test.equal(actualMessage, expectedStarted);
            } else if (actualMessage === expectedFinished) {
                console.log("Client received finished");
                test.equal(actualMessage, expectedFinished);
                client.end();
            } else {
                test.failed("Unexpected Message");
                done();
            }
        });
        client.on('end', function () {
            console.log('Client disconnected');
            done();
        });
    },

    testRunUseJarScript: function (test) {
        var done = test.done;

        test.expect(3);
        console.log("testConnectUseJarScript");
        var net = require('net');

        var client = net.connect({port: 11642},
            function () { //'connect' listener
                console.log("Client Connected");

                console.log("Writing Prepare");
                client.write("PREPARE\n");
                client.write("version:2.0\n");
                client.write("name:org/kaazing/robotic/control/accept.finished.empty\n");
                client.write("name:org/kaazing/robotic/control/connect.finished.empty\n");
                client.write("\n");
            });

        var expectedPrepared = "PREPARED\n";

        var expectedStarted = "STARTED\n" +
            "\n";

        var expectedFinished = "FINISHED\n";

        client.on('data', function (data) {
            var actualMessage = data.toString();
            if (actualMessage.indexOf(expectedPrepared) === 0) {
                console.log("Client received prepared");
                test.ok(actualMessage.indexOf(expectedPrepared) === 0);
                console.log("Client sending start");
                client.write("START\n" +
                    "\n");
            } else if (actualMessage === expectedStarted) {
                console.log("Client received started");
                test.equal(actualMessage, expectedStarted);
            } else if (actualMessage.indexOf(expectedFinished) === 0) {
                console.log("Client received finished");
                test.ok(actualMessage.indexOf(expectedFinished) === 0);
                client.end();
            } else {
                console.log("Unexpected Message:");
                console.log(actualMessage);
                test.failed("Unexpected Message");
                done();
            }
        });
        client.on('end', function () {
            console.log('Client disconnected');
            done();
        });
    },

    testRunUseLocalScript: function (test) {
        var done = test.done;

        test.expect(3);
        console.log("testRunUseLocalScript");
        var net = require('net');

        var client = net.connect({port: 11642},
            function () { //'connect' listener
                console.log("Client Connected");

                console.log("Writing Prepare");
                client.write("PREPARE\n");
                client.write("version:2.0\n");
                client.write("name:sampleScript\n");
                client.write("\n");
            });

        var expectedPrepared = "PREPARED\n";

        var expectedStarted = "STARTED\n" +
            "\n";

        var expectedFinished = "FINISHED\n";

        client.on('data', function (data) {
            var actualMessage = data.toString();
            if (actualMessage.indexOf(expectedPrepared) === 0) {
                console.log("Client received prepared");
                test.ok(actualMessage.indexOf(expectedPrepared) === 0);
                console.log("Client sending start");
                client.write("START\n" +
                    "\n");
            } else if (actualMessage === expectedStarted) {
                console.log("Client received started");
                test.equal(actualMessage, expectedStarted);
            } else if (actualMessage.indexOf(expectedFinished) === 0) {
                console.log("Client received finished");
                test.ok(actualMessage.indexOf(expectedFinished) === 0);
                client.end();
            } else {
                console.log("Unexpected Message:");
                console.log(actualMessage);
                test.failed("Unexpected Message");
                done();
            }
        });
        client.on('end', function () {
            console.log('Client disconnected');
            done();
        });
    }
};
