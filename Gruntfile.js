module.exports = function (grunt) {

    grunt.initConfig({

        env: {
            coverage: {
                APP_DIR_FOR_CODE_COVERAGE: '../test/coverage/instrument/lib/'
            }
        },
        clean: {
            coverage: {
                src: ['test/coverage/']
            }
        },
        instrument: {
            files: 'lib/*.js',
            options: {
                lazy: true,
                basePath: 'test/coverage/instrument/'
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: './test/bootstrap'
                },
                src: ['test/**/*test.js']
            }
        },
        storeCoverage: {
            options: {
                dir: 'test/coverage/reports'
            }
        },
        makeReport: {
            src: 'test/coverage/reports/**/*.json',
            options: {
                type: 'lcov',
                dir: 'test/coverage/reports',
                print: 'detail'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-env');

    grunt.registerTask('test', 'mochaTest');
    grunt.registerTask('coverage', ['env:coverage', 'clean', 'instrument', 'mochaTest', 'storeCoverage', 'makeReport']);

};