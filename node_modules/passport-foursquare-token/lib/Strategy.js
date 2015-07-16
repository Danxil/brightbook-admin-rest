var util = require('util');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var InternalOAuthError = require('passport-oauth').InternalOAuthError;

util.inherits(FoursquareTokenStrategy, OAuth2Strategy);

/**
 * `Strategy` constructor.
 * The Foursquare authentication strategy authenticates requests by delegating to Foursquare using OAuth2 access tokens.
 * Applications must supply a `verify` callback which accepts a accessToken, refreshToken, profile and callback.
 * Callback supplying a `user`, which should be set to `false` if the credentials are not valid.
 * If an exception occurs, `error` should be set.
 *
 * Options:
 * - clientID          Identifies client to Foursquare App
 * - clientSecret      Secret used to establish ownership of the consumer key
 * - passReqToCallback If need, pass req to verify callback
 *
 * Example:
 *     passport.use(new FoursquareTokenStrategy({
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
function FoursquareTokenStrategy(_options, _verify) {
  var options = _options || {};
  options.authorizationURL = options.authorizationURL || 'https://foursquare.com/oauth2/authenticate';
  options.tokenURL = options.tokenURL || 'https://foursquare.com/oauth2/access_token';
  options.profileURL = options.profileURL || 'https://api.foursquare.com/v2/users/self';
  options.apiVersion = options.apiVersion || '20140308';

  OAuth2Strategy.call(this, options, _verify);

  this.name = 'foursquare-token';
  this._apiVersion = options.apiVersion;
  this._profileURL = options.profileURL;
  this._passReqToCallback = options.passReqToCallback;
  this._oauth2.setAccessTokenName("oauth_token");
}

/**
 * Authenticate method
 * @param {Object} req
 * @param {Object} options
 * @returns {*}
 */
FoursquareTokenStrategy.prototype.authenticate = function (req, options) {
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
 * @param {String} accessToken Foursquare OAuth2 access token
 * @param {Function} done
 */
FoursquareTokenStrategy.prototype.userProfile = function (accessToken, done) {
  var url = this._apiVersion ? (this._profileURL + '?v=' + this._apiVersion) : this._profileURL;

  this._oauth2.get(url, accessToken, function (error, body, res) {
    if (error) {
      try {
        var errorJSON = JSON.parse(error.data);
        return done(new InternalOAuthError(errorJSON.meta.errorDetail, errorJSON.meta.code));
      } catch (_) {
        return done(new InternalOAuthError('Failed to fetch user profile', error));
      }
    }

    try {
      var json = JSON.parse(body);
      json['id'] = json.response.user.id;

      var profile = {
        provider: 'foursquare',
        id: json.id,
        displayName: json.response.user.firstName + ' ' + json.response.user.lastName,
        name: {
          familyName: json.response.user.lastName || '',
          givenName: json.response.user.firstName || ''
        },
        emails: [{value: json.response.user.contact.email}],
        photos: [{value: json.response.user.photo}],
        _raw: body,
        _json: json
      };

      return done(null, profile);
    } catch (e) {
      return done(e);
    }
  });
};

module.exports = FoursquareTokenStrategy;
