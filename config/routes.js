/**
 * Route Mappings
 *
 * Your routes map URLs to views and controllers
 */

module.exports.routes = {
  'post /api/category': 'CategoryController.create',
  'put /api/category/:id': 'CategoryController.edit',
};
