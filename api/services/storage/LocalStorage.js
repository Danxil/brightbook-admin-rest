var vow = require('vow');
var path = require('path');
var fs = require('fs');
var _ = require('underscore');


function LocalStorage(uploadPath) {
  this._uploadDir = uploadPath
  this._uploadPath = path.join(process.cwd(), uploadPath)

  this._getPath = function(filePath) {
    var fileName = filePath.split('/')
    fileName = fileName[fileName.length - 1]

    return path.join(this._uploadDir, fileName)
  }
}

LocalStorage.prototype = Object.create({
  constructor: LocalStorage,

  upload: function (req) {
    var def = vow.defer()

    req.file('file').upload({dirname: this._uploadPath}, function (err, uploadedFiles) {
      var arr = []

      uploadedFiles.forEach(function(file) {
        arr.push(this._getPath(file.fd))
      }.bind(this))

      def.resolve(arr)
    }.bind(this))

    return def.promise()
  },

  remove: function (file) {
    var def = vow.defer()

    fs.unlink(path.join(sails.config.appPath, file), function() {
      def.resolve()
    })

    return def.promise()
  }
});

module.exports = LocalStorage;
