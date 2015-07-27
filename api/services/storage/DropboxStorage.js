var vow = require('vow');
var Dropbox = require('dropbox');


function DropboxStorage(options) {
  if (options === undefined)
    options = {}

  if ((!options.key && !process.env.DROPBOX_KEY) || (!options.secret && !process.env.DROPBOX_SECRET)) {
    throw new Error('You must provide tokens');
  }

  var client = new Dropbox.Client({
    key: options.key || process.env.DROPBOX_KEY,
    secret: options.secret || process.env.DROPBOX_SECRET,
    token: options.token || process.env.DROPBOX_TOKEN
  })
}

DropboxStorage.prototype = Object.create({
  constructor: DropboxStorage,

  upload: function () {
    
  },

  get: function () {
  },

  remove: function () {
  }
});

module.exports = DropboxStorage;
