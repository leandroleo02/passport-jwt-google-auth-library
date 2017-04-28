// https://blog.risingstack.com/getting-node-js-testing-and-tdd-right-node-js-at-scale/
var chai = require('chai');
chai.use(require('chai-passport-strategy'));
global.expect = chai.expect;