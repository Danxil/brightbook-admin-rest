/**
 * Route Mappings
 *
 * Your routes map URLs to views and controllers
 */

module.exports.routes = {
  'post /api/upload/:model/:id/:property': 'UploadController.upload',
  'delete /api/upload/:model/:id/:property/:uploadId': 'UploadController.remove',
};
