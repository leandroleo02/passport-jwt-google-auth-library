'use strict';

// https://quickleft.com/blog/creating-and-publishing-a-node-js-module/
var Strategy = require('./strategy'),
    ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = {
    Strategy: Strategy,
    ExtractJwt : ExtractJwt
};
