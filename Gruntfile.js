// https://blog.risingstack.com/getting-node-js-testing-and-tdd-right-node-js-at-scale/
module.exports = function (grunt) {

    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: './test/bootstrap'
                },
                src: ['test/**/*test.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', 'mochaTest');

};