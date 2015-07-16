var util = require('util');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var InternalOAuthError = require('passport-oauth').InternalOAuthError;

util.inherits(PaypalTokenStrategy, OAuth2Strategy);

/**
 * `Strategy` constructor.
 * The Paypal authentication strategy authenticates requests by delegating to Paypal using OAuth2 access tokens.
 * Applications must supply a `verify` callback which accepts a accessToken, refreshToken, profile and callback.
 * Callback supplying a `user`, which should be set to `false` if the credentials are not valid.
 * If an exception occurs, `error` should be set.
 *
 * Options:
 * - clientID          Identifies client to Paypal App
 * - clientSecret      Secret used to establish ownership of the consumer key
 * - passReqToCallback If need, pass req to verify callback
 *
 * Example:
 *     passport.use(new PaypalTokenStrategy({
 *           clientID: '123-456-789',
 *           clientSecret: 'shhh-its-a-secret',
 *           passReqToCallback: true
 *       }, function(req, accessToken, refreshToken, profile, next) {
 *              User.findOrCreate(..., function (error, user) {
 *                  next(error, user);
 *              });
 *          }
 *       ));
 *
 * @param {Object} _options
 * @param {Function} _verify
 * @constructor
 */
function PaypalTokenStrategy(_options, _verify) {
  var options = _options || {};
  options.authorizationURL = options.authorizationURL || 'https://www.paypal.com/webapps/auth/protocol/openidconnect/v1/authorize';
  options.tokenURL = options.tokenURL || 'https://www.paypal.com/webapps/auth/protocol/openidconnect/v1/tokenservice';
  options.profileURL = options.profileURL || 'https://www.paypal.com/webapps/auth/protocol/openidconnect/v1/userinfo?schema=openid';

  OAuth2Strategy.call(this, options, _verify);

  this.name = 'paypal-token';
  this._profileURL = options.profileURL;
  this._passReqToCallback = options.passReqToCallback;
  this._oauth2.setAccessTokenName('oauth_token');
}

/**
 * Authenticate method
 * @param {Object} req
 * @param {Object} options
 * @returns {*}
 */
PaypalTokenStrategy.prototype.authenticate = function (req, options) {
  var self = this;
  var accessToken = (req.body && req.body.access_token) || (req.query && req.query.access_token) || (req.headers && req.headers.access_token);
  var refreshToken = (req.body && req.body.refresh_token) || (req.query && req.query.refresh_token) || (req.headers && req.headers.refresh_token);

  if (!accessToken) {
    return self.fail({message: 'You should provide access_token'});
  }

  self._loadUserProfile(accessToken, function (error, profile) {
    if (error) return self.error(error);

    function verified(error, user, info) {
      if (error) return self.error(error);
      if (!user) return self.fail(info);

      return self.success(user, info);
    }

    if (self._passReqToCallback) {
      self._verify(req, accessToken, refreshToken, profile, verified);
    } else {
      self._verify(accessToken, refreshToken, profile, verified);
    }
  });
};

/**
 * Parse user profile
 * @param {String} accessToken Paypal OAuth2 access token
 * @param {Function} done
 */
PaypalTokenStrategy.prototype.userProfile = function (accessToken, done) {
  this._oauth2.get(this._profileURL, accessToken, function (error, body, res) {
    if (error) return done(new InternalOAuthError('Failed to fetch user profile', error.statusCode));

    try {
      var json = JSON.parse(body);
      json['id'] = json.identity.userId;

      var profile = {
        provider: 'paypal',
        id: json.id,
        displayName: [json.identity.firstName, json.identity.lastName].join(' '),
        name: {
          familyName: json.identity.lastName || '',
          givenName: json.identity.firstName || ''
        },
        emails: [],
        photos: [],
        _raw: body,
        _json: json
      };

      json.identity.emails.forEach(function (email) {
        profile.emails.push({value: email});
      });

      return done(null, profile);
    } catch (e) {
      return done(e);
    }
  });
};

module.exports = PaypalTokenStrategy;
