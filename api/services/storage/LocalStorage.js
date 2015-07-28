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

  upload: function (req, fileNames) {
    if (!_.isArray(fileNames))
      fileNames = [fileNames]

    var def = vow.defer()

    var filesDefs = []

    fileNames.forEach(function(item) {
      var file = req.file(item)

      var def = vow.defer()
      filesDefs.push(def.promise())

      file.upload({dirname: this._uploadPath}, function (err, uploadedFiles) {
        def.resolve(uploadedFiles)
      })
    }.bind(this))

    vow.all(filesDefs).then(function(all) {
      var obj = {}

      all.forEach(function(item) {
        item.forEach(function(file) {
          obj[file.field] = []
          obj[file.field].push(this._getPath(file.fd))
        }.bind(this))
      }.bind(this))

      def.resolve(obj)
    }.bind(this))

    return def.promise()
  },

  remove: function (obj, deleteFilesProps) {
    if (!_.isArray(deleteFilesProps))
      deleteFilesProps  = [deleteFilesProps]

    var defArr = []

    deleteFilesProps.forEach(function(item) {
      var def = vow.defer()
      defArr.push(def.promise())

      if (!obj[item])
        return def.resolve()

      fs.unlink(path.join(sails.config.appPath, obj[item]), function() {
        def.resolve()
      })
    })

    return vow.all(defArr)
  }
});

module.exports = LocalStorage;
