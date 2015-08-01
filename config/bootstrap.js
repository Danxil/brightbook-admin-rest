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
		{
			name: 'book1',
			priceE: 21,
			priceA: 22,
			countReeditions: 1,
			recommendRetailPrice: 243,
			dateFirstEdition: 4,
			length: 12,
		},
		{
			name: 'book2',
			priceE: 21,
			priceA: 22,
			countReeditions: 1,
			recommendRetailPrice: 243,
			dateFirstEdition: 4,
			length: 12,
		},
		{
			name: 'book3',
			priceE: 21,
			priceA: 22,
			countReeditions: 1,
			recommendRetailPrice: 243,
			dateFirstEdition: 4,
			length: 12,
		}
	]
	var categories = [
	  {name: 'category1', headerColor: 1},
		{name: 'category2', headerColor: 2},
		{name: 'category3', headerColor: 1}
	]

	var bookReviews = [
		{text: 'review1', author: 'author1', book: 1},
		{text: 'review2', author: 'author2', book: 1},
		{text: 'review3', author: 'author3', book: 2}
	]

	HeaderColor.create(headerColors).exec(function() {
		Book.create(books).exec(function() {
			Category.create(categories).exec(function() {
				BookReview.create(bookReviews).exec(function() {
					cb()
				})
			})
		})
  })
};
