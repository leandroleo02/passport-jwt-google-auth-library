# passport-jwt-google-auth-library [![Build Status](https://travis-ci.org/leandroleo02/passport-jwt-google-auth-library.png)](https://travis-ci.org/leandroleo02/passport-jwt-google-auth-library)


A [Passport](http://passportjs.org/) strategy for authenticating with a google JWT token.

This module lets you authenticate endpoints using a Google JWT web token. Once the user has authenticated with a google account, 
the token provided by google can be authorized by this module (Using [google-auth-library] (https://github.com/google/google-auth-library-nodejs)). It is intended to be used to secure RESTful endpoints without sessions.

This module is based on [passport-jwt](https://github.com/themikenicholson/passport-jwt), and use it internally.

## Install

    npm install passport-jwt-google-auth-library

## Usage

### Configure Strategy

The JWT Google Auth Library authentication strategy is constructed as follows:

    new JwtGoogleAuthLibraryStrategy(options, verify)

`options` is an object literal containing options to control how the token is
extracted from the request.

* `clientID` is a REQUIRED string or array containing the audience to verify against the ID Token.

* `secretOrKey` is a REQUIRED string containing the secret
  (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's
  signature.

* `jwtFromRequest` (REQUIRED) Function that accepts a request as the only
  parameter and returns either the JWT as a string or *null*. This approach is base on [passport-jwt](https://github.com/themikenicholson/passport-jwt). See 
  [Extracting the JWT from the request](#extracting-the-jwt-from-the-request) for more details.

* `passReqToCallback`: If true the request will be passed to the verify
  callback. i.e. verify(request, jwt_payload, done_callback).

`verify` is a function with the parameters `verify(jwt_payload, done)`

* `jwt_payload` is an object literal containing the decoded JWT payload.
* `done` is a passport error first callback accepting arguments
  done(error, user, info)
    
An example configuration which reads the JWT from the http Authorization header with the scheme 'JWT':

```js
var passportStrategy = require('passport-jwt-google-auth-library'),
    JwtGoogleAuthLibraryStrategy = passportStrategy.Strategy,
    ExtractJwt = passportStrategy.ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.clientID = 'clientID';
opts.secretOrKey = 'secret';
passport.use(new JwtGoogleAuthLibraryStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
```
### Extracting the JWT from the request

[Extracting the JWT from the request](https://github.com/themikenicholson/passport-jwt/blob/master/README.md#extracting-the-jwt-from-the-request) for more details.

### Authenticate requests

Use `passport.authenticate()` specifying `'JWT'` as the strategy.

```js
app.post('/profile', passport.authenticate('jwt-google-auth-library', { session: false }),
    function(req, res) {
        res.send(req.user.profile);
    }
);
```

### Include the JWT in requests

The strategy will first check the request for the standard *Authorization*
header. If this header is present and the scheme matches `options.authScheme`
or 'JWT' if no auth scheme was specified then the token will be retrieved from
it. e.g.

    Authorization: JWT JSON_WEB_TOKEN_STRING.....
    
If the authorization header with the expected scheme is not found, the request
body will be checked for a field matching either `options.tokenBodyField` or
`auth_token` if the option was not specified.

Finally, the URL query parameters will be checked for a field matching either
`options.tokenQueryParameterName` or `auth_token` if the option was not
specified.

## Tests

    npm install
    npm test

To generate test-coverage reports:

    npm run-script testcov

## License

The [MIT License](http://opensource.org/licenses/MIT)