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

    var DataModel = req._sails.models[params.model]
    var UploadModel = req._sails.models[params.model + params.property]

    DataModel.findOne({id: params.id}).then(function(dataModel) {
      if (!dataModel)
        res.serverError('Not found DataModel')

      localStorage.upload(req, params.property).then(function(links) {
        var deffArr = []

        links.forEach(function (item) {
          var def = vow.defer()
          deffArr.push(def.promise())

          UploadModel.create({link: item}).then(function(uploadModel) {
            def.resolve(dataModel.bg.add(uploadModel.id))
          }, function() {
            def.reject()
          })
        })

        vow.all(deffArr).then(function() {
          dataModel.save().then(function(dataModel) {
            res.send(201, dataModel)
          }, function() {
            res.serverError()
          })
        }, function() {
          res.serverError('Create UploadModel error')
        })
      }, function() {
        res.serverError('Upload error')
      })
    }, function() {
      res.serverError('Find error')
    })
  },

  remove: function (req, res) {
    var params = req.params
    var localStorage = StorageService.createLocal(path.join(sails.config.dirs.media, params.model, params.property))

    var DataModel = req._sails.models[params.model]
    var UploadModel = req._sails.models[params.model + params.property]

    UploadModel.findOne({id: params.uploadId, category: params.id}).then(function(uploadModel) {
      if (!uploadModel)
        return res.serverError('Not found UploadModel')

      localStorage.remove(uploadModel.link).then(function() {
        uploadModel.destroy().then(function() {
          DataModel.findOne({id: params.id}).then(function(dataModel) {
            res.send(dataModel)
          })
        })
      }, function() {
        res.serverError('Remove file error')
      })

    }, function() {
      res.serverError('Find error')
    })
  }
};
