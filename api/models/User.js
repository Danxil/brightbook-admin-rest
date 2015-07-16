/**
 * User
 * @description :: Model for storing users
 */

module.exports = {
  schema: true,

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    password: {
      type: 'string'
    },

    toJSON: function () {
      var obj = this.toObject();

      delete obj.password;

      return obj;
    }
  },

  beforeUpdate: function (values, next) {
    // TODO: replace with new cipher service
    if (values.password) values.password = CipherService.create('bcrypt', values.password).hashSync();
    next();
  },

  beforeCreate: function (values, next) {
    // TODO: replace with new cipher service
    if (values.password) values.password = CipherService.create('bcrypt', values.password).hashSync();
    next();
  }
};
