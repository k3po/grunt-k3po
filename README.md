# grunt-k3po
[![Build Status][build-status-image]][build-status]
[build-status-image]: https://travis-ci.org/k3po/grunt-k3po.svg?branch=develop
[build-status]: https://travis-ci.org/k3po/grunt-k3po

> Plugin to utilize k3po (https://github.com/kaazing/robot) from grunt builds

##Required for building

* [Node.js](http://nodejs.org/)
* [Grunt](http://gruntjs.com/)

##Steps to build

* Command to install all the dependencies:```npm install```
* Command to build: ```grunt```

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-k3po --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-k3po');
```

## The "k3po" task

### Overview
In your project's Gruntfile, add a section named `k3po` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
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
});

grunt.registerTask('test', ['clean', 'k3po:start', 'nodeunit', 'k3po:stop']);
```

### Available Options and Default Value

daemon: true 
uri: "tcp://localhost:11642"
verbose: false
scripts: "test/scripts"
goal: "start"

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
