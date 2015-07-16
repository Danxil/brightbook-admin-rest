var util = require('util');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var InternalOAuthError = require('passport-oauth').InternalOAuthError;

util.inherits(WindowsLiveTokenStrategy, OAuth2Strategy);

/**
 * `Strategy` constructor.
 * The Windows Live authentication strategy authenticates requests by delegating to Windows Live using OAuth2 access tokens.
 * Applications must supply a `verify` callback which accepts a accessToken, refreshToken, profile and callback.
 * Callback supplying a `user`, which should be set to `false` if the credentials are not valid.
 * If an exception occurs, `error` should be set.
 *
 * Options:
 * - clientID          Identifies client to Windows Live App
 * - clientSecret      Secret used to establish ownership of the consumer key
 * - passReqToCallback If need, pass req to verify callback
 *
 * Example:
 *     passport.use(new WindowsLiveTokenStrategy({
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
function WindowsLiveTokenStrategy(_options, _verify) {
  var options = _options || {};
  options.authorizationURL = options.authorizationURL || 'https://login.live.com/oauth20_authorize.srf';
  options.tokenURL = options.tokenURL || 'https://login.live.com/oauth20_token.srf';
  options.profileURL = options.profileURL || 'https://apis.live.net/v5.0/me';

  OAuth2Strategy.call(this, options, _verify);

  this.name = 'windows-live-token';
  this._profileURL = options.profileURL;
  this._passReqToCallback = options.passReqToCallback;
}

/**
 * Authenticate method
 * @param {Object} req
 * @param {Object} options
 * @returns {*}
 */
WindowsLiveTokenStrategy.prototype.authenticate = function (req, options) {
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
 * @param {String} accessToken Windows Live OAuth2 access token
 * @param {Function} done
 */
WindowsLiveTokenStrategy.prototype.userProfile = function (accessToken, done) {
  this._oauth2.get(this._profileURL, accessToken, function (error, body, res) {
    if (error) {
      try {
        var errorJSON = JSON.parse(error.data);
        return done(new InternalOAuthError(errorJSON.error.message, errorJSON.error.code));
      } catch (_) {
        return done(new InternalOAuthError('Failed to fetch user profile', error));
      }
    }

    try {
      var json = JSON.parse(body);
      var profile = {
        provider: 'windows-live',
        id: json.id,
        username: json.username || '',
        displayName: json.name || '',
        name: {
          familyName: json.last_name || '',
          givenName: json.first_name || ''
        },
        emails: [],
        photos: [{
          value: 'https://apis.live.net/v5.0/' + json.id + '/picture'
        }],
        _raw: body,
        _json: json
      };

      if (json.emails && json.emails.account) {
        profile.emails.push({value: json.emails.account, type: 'account'});
      }

      if (json.emails && json.emails.personal) {
        profile.emails.push({value: json.emails.personal, type: 'home'});
      }

      if (json.emails && json.emails.business) {
        profile.emails.push({value: json.emails.business, type: 'work'});
      }

      if (json.emails && json.emails.other) {
        profile.emails.push({value: json.emails.other, type: 'other'});
      }

      if (json.emails && json.emails.preferred) {
        for (var i = 0; i < profile.emails.length; i++) {
          if (profile.emails[i].value == json.emails.preferred) {
            profile.emails[i].primary = true;
          }
        }
      }

      return done(null, profile);
    } catch (e) {
      return done(e);
    }
  });
};

module.exports = WindowsLiveTokenStrategy;
