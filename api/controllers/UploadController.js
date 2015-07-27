/**
 * UploadController
 * @description :: Server-side logic for uploading binary files
 */

module.exports = {
  /**
   * Upload any file to storage and get link to it
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  index: function (req, res) {
    var dropbox = StorageService.createDropbox()
  }
};
