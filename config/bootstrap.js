/**
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 * @param {Function} cb This function should always be called, so DON'T REMOVE IT
 */

module.exports.bootstrap = function (cb) {
	var headerColors = [
		{color: 'white'},
		{color: 'black'}
	]
	var books = [
		{name: 'book1'},
		{name: 'book2'},
		{name: 'book3'}
	]
	var categories = [
	  {name: 'category1', headerColor: 1},
		{name: 'category2', headerColor: 2},
		{name: 'category3', headerColor: 1}
	]
	

  HeaderColor.create(headerColors).exec(function() {
		Book.create(books).exec(function() {
			Category.create(categories).exec(function() {
				cb()
			})
		})
  })
};
