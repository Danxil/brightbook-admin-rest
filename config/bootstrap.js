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

	var coverTypes = [
		{name: '10/30/20'},
		{name: '20/30/40'},
		{name: '150/200/100'}
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
			coverType: 1
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

	var rubrics = [
		{name: 'rubric1', color: '#FF0000'},
		{name: 'rubric2', color: '#FF0000'},
		{name: 'rubric3', color: '#FF0000'}
	]

	var bookReviews = [
		{text: 'review1', author: 'author1', book: 1},
		{text: 'review2', author: 'author2', book: 1},
		{text: 'review3', author: 'author3', book: 2}
	]

	var authors = [
		{name: 'author1'},
		{name: 'author2'},
		{name: 'author3'}
	]

	Author.create(authors).exec(function(err, authors) {
		HeaderColor.create(headerColors).exec(function () {
			CoverType.create(coverTypes).exec(function () {
				Rubric.create(rubrics).exec(function (err, rubrics) {
					Category.create(categories).exec(function (err, categories) {
						Book.create(books).exec(function (err, books) {
							books[0].categories.add(categories[0].id)
							books[0].rubrics.add(rubrics[0].id)
							books[0].authors.add(authors[0].id)

							books[0].save().then(function () {
								books[1].categories.add(categories[0].id)
								books[1].rubrics.add(rubrics[0].id)
								books[1].authors.add(authors[0].id)

								books[1].save().then(function () {
									BookReview.create(bookReviews).exec(function () {
										cb()
									})
								})
							})
						})
					})
				})
			})
		})
	})
};
