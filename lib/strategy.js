'use strict';

var passport = require('passport-strategy'),
    GoogleAuth = require('google-auth-library'),
    passportJWT = require("passport-jwt"),
    util = require('util');



/**
 * Strategy constructor
 *
 * @param options
 *          clientID: (REQUIRED) String containing the client ID
 *          secretOrKey: (REQUIRED) String or buffer containing the secret or PEM-encoded public key
 *          jwtFromRequest: (REQUIRED) Function that accepts a reqeust as the only parameter and returns the either JWT as a string or null
 *          passReqToCallback: If true the, the verify callback will be called with args (request, jwt_payload, done_callback).
 *          jwtFromRequest: Object to refer where to obtain the jwt token: 
 *         
 * @param verify - (REQUIRED) Verify callback with args (jwt_payload, done_callback) if passReqToCallback is false,
 *                 (request, jwt_payload, done_callback) if true.
 */
function JwtGoogleAuthLibraryStrategy(options, verify) {

    passport.Strategy.call(this);
    this.name = 'jwt-google-auth-library';

    this._clientID = options.clientID;
    if (!this._clientID) {
        throw new TypeError('JwtGoogleAuthLibraryStrategy requires a client ID');
    }

    this._secretOrKey = options.secretOrKey;
    if (!this._secretOrKey) {
        throw new TypeError('JwtGoogleAuthLibraryStrategy requires a secret or key');
    }

    this._jwtFromRequest = options.jwtFromRequest;
    if (!this._jwtFromRequest) {
        throw new TypeError('JwtGoogleAuthLibraryStrategy requires a function to retrieve jwt from requests (see option jwtFromRequest)');
    }

    this._verify = verify;
    if (!this._verify) {
        throw new TypeError('JwtGoogleAuthLibraryStrategy requires a verify callback');
    }

    this._passReqToCallback = options.passReqToCallback;
};

util.inherits(JwtGoogleAuthLibraryStrategy, passport.Strategy);

/**
 *  Allow for injection of JWT Verifier BY google Auth.
 */
JwtGoogleAuthLibraryStrategy.JwtVerifier = require('./google_auth_verify_jwt');

/**
 * Authenticate request based on JWT obtained from header
 */
JwtGoogleAuthLibraryStrategy.prototype.authenticate = function (req, options) {

    var self = this;

    var token = self._jwtFromRequest(req);

    if (!token) {
        return self.fail(new Error("No auth token"));
    }

    // Verify the JWT
    JwtGoogleAuthLibraryStrategy.JwtVerifier(token, this._clientID, this._secretOrKey, function (err, login) {

        if (err) {
            return self.fail(err)
        } else {
            // Pass the parsed token to the user
            var verified = function (err, user, info) {
                if (err) {
                    return self.error(err);
                } else if (!user) {
                    return self.fail(info);
                } else {
                    return self.success(user, info);
                }
            };

            try {
                var payload = login.getPayload();
                if (self._passReqToCallback) {
                    self._verify(req, payload, verified);
                } else {
                    self._verify(payload, verified);
                }
            } catch (ex) {
                self.error(ex);
            }
        }
    });
};

/**
 * Export the JwtGoogleAuthLibraryStrategy
 */
module.exports = JwtGoogleAuthLibraryStrategy;
