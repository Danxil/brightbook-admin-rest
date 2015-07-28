/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var vow = require('vow')

module.exports = {
	create: function(req, res) {
    var localStorage = StorageService.createLocal('/media/categories')

    var filesProps = ['bg']

    Category.create(req.body).then(function(category) {

      localStorage.upload(req, filesProps).then(function(files) {
        _.keys(files).forEach(function(item) {
          category[item] = files[item][0]
        })

        category.save().then(function(category) {
          res.send(201, category)
        }, function() {
          res.send(500)
        })
      }, function() {
        res.send(500)
      })

    }, function() {
      res.send(500)
    })
  },
  edit: function(req, res) {
    var model = req.body
    var categoryId = req.params.id
    var localStorage = StorageService.createLocal('/media/categories')
    var filesProps = ['bg']
    var deleteFilesProps = []

    filesProps.forEach(function (item) {
      delete model[item]

      if (!req.body[item])
        deleteFilesProps.push(item)
    })

    Category.findOne({id: categoryId}).then(function (category) {
      if (!category)
        return res.send(500)

      var defArr = [
        localStorage.remove(category, deleteFilesProps).then(function (files) {
          deleteFilesProps.forEach(function (item) {
            category[item] = null
          })
        }),

        localStorage.upload(req, filesProps).then(function (files) {
          _.keys(files).forEach(function (item) {
            category[item] = files[item][0]
          })
        }, function() {
          res.send(500)
        })
      ]

      vow.all(defArr).then(function() {
        _.keys(model).forEach(function (item) {
          category[item] = model[item]
        })

        category.save().then(function (category) {
          res.send(200, category)
        }, function () {
          res.send(500)
        })
      })
    })
  }
};