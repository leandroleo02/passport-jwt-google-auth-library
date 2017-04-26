var GoogleAuth = require('google-auth-library');

module.exports = function (token, clientID, secretOrKey, callback) {

    var auth = new GoogleAuth;
    var client = new auth.OAuth2(clientID, secretOrKey);

    return client.verifyIdToken(token, clientID, callback);
};