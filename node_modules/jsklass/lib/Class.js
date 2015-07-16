/**
 * Extend object
 * @param {Object} target Target object
 * @param {Object} source Source object
 * @returns {Object}
 * @private
 */
function _extend(target, source) {
  var keys = Object.keys(source);

  for (var i = 0; i < keys.length; i++) {
    target[keys[i]] = source[keys[i]];
  }

  return target;
}

function Class() {
}

/**
 * Create new Class or extend exists
 * @static
 * @param  {Object} [_prototype]        Prototype object for new Class
 * @param  {Object} [_staticProperties] Object with static properties for new Class
 * @param  {Array}  [_mixins]           Array of mixins which need to inject in new Class prototype
 * @return {Object}                    Returns new Class
 *
 * @example
 * Class.create(prototype)
 * Class.create(prototype, staticProperties)
 * Class.create(prototype, staticProperties, [mixins])
 */
Class.create = function (_prototype, _staticProperties, _mixins) {
  var prototype = _prototype || {};
  var staticProperties = _staticProperties || {};
  var mixins = _mixins || [];

  function Constructor() {
    return this.init && this.init.apply(this, arguments);
  }

  Constructor.prototype = Object.create(this.prototype);

  Object.defineProperty(Constructor, 'constructor', {
    value: Constructor,
    enumerable: false,
    writable: false,
    configurable: true
  });

  Object.defineProperty(Constructor, 'extend', {
    value: Class.create,
    enumerable: false,
    writable: false,
    configurable: false
  });

  _extend(Constructor, staticProperties);
  _extend(Constructor.prototype, prototype);

  for (var i = mixins.length - 1; i >= 0; i--) {
    _extend(Constructor.prototype, mixins[i]);
  }

  return Constructor;
};

module.exports = Class;
