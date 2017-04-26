var Strategy = require('../lib/strategy');

describe('Strategy', function () {
    var strategy = new Strategy({ jwtFromRequest: {}, clientID: 'clientID', secretOrKey: 'secret' }, () => { });

    it('should be named jwt-google-auth-library', function () {
        expect(strategy.name).to.equal('jwt-google-auth-library');
    });

    it('should throw if constructed without a verify callback', function () {
        expect(function () {
            var s = new Strategy({ jwtFromRequest: {}, clientID: 'clientID', secretOrKey: 'secret' });
        }).to.throw(TypeError, "JwtGoogleAuthLibraryStrategy requires a verify callback");
    });

    it('should throw if constructed without a secretOrKey arg', function () {
        expect(function () {
            var s = new Strategy({ jwtFromRequest: {}, clientID: 'clientID', secretOrKey: null }, () => { });
        }).to.throw(TypeError, 'JwtGoogleAuthLibraryStrategy requires a secret or key');
    });

    it('should throw if constructed without a clientID arg', function () {
        expect(function () {
            var s = new Strategy({ jwtFromRequest: {}, secretOrKey: 'secret' }, () => { });
        }).to.throw(TypeError, 'JwtGoogleAuthLibraryStrategy requires a client ID');
    });

    it('should throw if constructed without a jwtFromRequest arg', function () {
        expect(function () {
            var s = new Strategy({ clientID: 'clientID', secretOrKey: 'secret' }, function () { });
        }).to.throw(TypeError);
    });
});
