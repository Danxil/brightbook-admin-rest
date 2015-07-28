/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var vow = require('vow')

module.exports = {
	create: function(req, res) {
    var files = ['bg']

    Category.create(req.body).then(function(category) {
      var filesDefs = []

      files.forEach(function(item) {
        var def = vow.defer()
        filesDefs.push(def.promise())

        req.file(item).upload({dirname: sails.config.dirs.media}, function (err, uploadedFiles) {
          def.resolve(uploadedFiles)
        })
      })

      vow.all(filesDefs).then(function(all) {

        all.forEach(function(item) {
          item = item[0]
          category[item.field] = item.fd
        })

        category.save().then(function(category) {
          res.send(201, category)
        }, function() {
          res.send(500)
        })
      })
    }, function() {
      res.send(500)
    })
  }
};