/**
 * UploadController
 * @description :: Server-side logic for uploading binary files
 */

var vow = require('vow')
var path = require('path')

module.exports = {
  /**
   * Upload any file to storage and get link to it
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  upload: function (req, res) {
    var params = req.params
    var localStorage = StorageService.createLocal(path.join(sails.config.dirs.media, params.model, params.property))

    var DataModel = req._sails.models[params.model.toLowerCase()]
    var UploadModel = req._sails.models[params.model.toLowerCase() + params.property.toLowerCase()]

    DataModel.findOne({id: params.id}).then(function(dataModel) {
      if (!dataModel)
        res.serverError('Not found DataModel')

      localStorage.upload(req, params.property).then(function(links) {
        var deffArr = []

        links.forEach(function (item) {
          var def = vow.defer()
          deffArr.push(def.promise())

          UploadModel.create({link: item}).then(function(uploadModel) {
            def.resolve(dataModel[params.property + 's'].add(uploadModel.id))
          }, function() {
            def.reject()
          })
        })

        vow.all(deffArr).then(function() {
          dataModel.save().then(function(dataModel) {
            res.send(201, dataModel)
          }, function(err) {
            res.serverError(err)
          })
        }, function(err) {
          res.serverError(err)
        })
      }, function(err) {
        res.serverError(err)
      })
    }, function(err) {
      res.serverError(err)
    })
  },

  remove: function (req, res) {
    var params = req.params
    var localStorage = StorageService.createLocal(path.join(sails.config.dirs.media, params.model, params.property))

    var DataModel = req._sails.models[params.model.toLowerCase()]
    var UploadModel = req._sails.models[params.model.toLowerCase() + params.property.toLowerCase()]

    var condition = {}
    condition.id = params.uploadId
    condition[params.model] = params.id

    UploadModel.findOne(condition).then(function(uploadModel) {
      if (!uploadModel)
        return res.serverError('Not found UploadModel')

      localStorage.remove(uploadModel.link).then(function() {
        uploadModel.destroy().then(function() {
          DataModel.findOne({id: params.id}).then(function(dataModel) {
            res.send(dataModel)
          })
        })
      }, function(err) {
        res.serverError(err)
      })

    }, function(err) {
      res.serverError(err)
    })
  }
};
