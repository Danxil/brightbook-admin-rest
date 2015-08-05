/**
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 * @param {Function} cb This function should always be called, so DON'T REMOVE IT
 */

var _ = require('underscore')

module.exports.bootstrap = function (cb) {
	var headerColors = [
		{color: 'white', id: 1},
		{color: 'black', id: 2}
	]

	var formSideSchema = [
		{side: 'left', id: 1},
		{side: 'right', id: 2}
	]

	var coverTypes = [
		{name: 'Твердый переплет'},
		{name: 'Мягкий переплет'},
	]

	var formats = [
		{name: '150/200/100'},
		{name: '15/20/10'},
	]


	var categoryBgs = [
		{
			id: 1,
			link: '/media/category/bg/1.jpg',
			category: 1
		},
		{
			id: 2,
			link: '/media/category/bg/2.jpg',
			category: 2
		},
		{
			id: 3,
			link: '/media/category/bg/3.jpg',
			category: 3
		},
		{
			id: 4,
			link: '/media/category/bg/4.jpg',
			category: 4
		},
		{
			id: 5,
			link: '/media/category/bg/5.jpg',
			category: 5
		},
		{
			id: 6,
			link: '/media/category/bg/6.jpg',
			category: 6
		},
		{
			id: 7,
			link: '/media/category/bg/7.jpg',
			category: 7
		},
		{
			id: 8,
			link: '/media/category/bg/8.jpg',
			category: 8
		},
		{
			id: 9,
			link: '/media/category/bg/9.jpg',
			category: 9
		},
		{
			id: 11,
			link: '/media/category/bg/11.jpg',
			category: 11
		},
		{
			id: 12,
			link: '/media/category/bg/12.jpg',
			category: 12
		},{
			id: 13,
			link: '/media/category/bg/13.jpg',
			category: 13
		},
		{
			id: 14,
			link: '/media/category/bg/14.jpg',
			category: 14
		}
	]


	var books = [
		{
			id: 1,
			name: 'book1',
			priceE: 21,
			priceA: 22,
			countReeditions: 1,
			recommendRetailPrice: 243,
			dateFirstEdition: 4,
			length: 12,
			coverType: 1,
			format: 1,
			formSideSchema: 2
		},
		{
			id: 2,
			name: 'book2',
			priceE: 21,
			priceA: 22,
			countReeditions: 1,
			recommendRetailPrice: 243,
			dateFirstEdition: 4,
			length: 12,
			coverType: 1,
			format: 2,
			formSideSchema: 1
		},
		{
			id: 3,
			name: 'book3',
			priceE: 21,
			priceA: 22,
			countReeditions: 1,
			recommendRetailPrice: 243,
			dateFirstEdition: 4,
			length: 12,
			coverType: 1,
			format: 1,
			formSideSchema: 1
		}
	]

	var categories = [
	  {name: 'Бизнес', headerColor: 1, id: 1},
		{name: 'Биографии и мемуары', headerColor: 1, id: 2},
		{name: 'Детские', headerColor: 2, id: 3},
		{name: 'Здоровье', headerColor: 1, id: 4},
		{name: 'Мужчина и женщина', headerColor: 2, id: 5},
		{name: 'Политика', headerColor: 1, id: 6},
		{name: 'Родителям', headerColor: 2, id: 7},
		{name: 'Саморазвитие', headerColor: 2, id: 8},
		{name: 'Христианство', headerColor: 2, id: 9},
		{name: 'Художественные', headerColor: 2, id: 10},
		{name: 'Подарок мужчине', headerColor: 2, highlight: true, id: 11},
		{name: 'В подарок женщине', headerColor: 1, highlight: true, id: 12},
		{name: 'В отпуск', headerColor: 2, highlight: true, id: 13},
		{name: 'Теплые истории', headerColor: 2, highlight: true, id: 14},
	]

	var rubrics = [
		{name: 'Бестселлеры', color: '#FF0000'},
		{name: 'Новинки', color: '#FF0000'},
		{name: 'Рекомендуемые', color: '#FF0000'},
		{name: 'Скоро', color: '#FF0000'},
		{name: 'Электронные книги', color: '#FF0000'},
	]

	var bookReviews = [
		{
			text: 'Не думал, что лицо, которое изображено на обложке, привлечет столько людей Сергей Лещенко',
			author: 'Сергей Лещенко',
			book: 1,
			id: 1
		},
		{
			text: 'Не думал, что лицо, которое изображено на обложке, привлечет столько людей Сергей Лещенко',
			author: 'Сергей Лещенко',
			book: 1,
			id: 2
		},
		{
			text: 'Не думал, что лицо, которое изображено на обложке, привлечет столько людей Сергей Лещенко',
			author: 'Сергей Лещенко',
			book: 2,
			id: 3
		}
	]

	var authors = [
		{name: 'author1'},
		{name: 'author2'},
		{name: 'author3'}
	]


	Author.create(authors).exec(function(err, authors) {
		FormSideSchema.create(formSideSchema).exec(function() {
			HeaderColor.create(headerColors).exec(function () {
				BookFormat.create(formats).exec(function () {
					CoverType.create(coverTypes).exec(function () {
						Rubric.create(rubrics).exec(function (err, rubrics) {
							Category.create(categories).exec(function (err, categories) {
								CategoryBg.create(categoryBgs).exec(function (err, categoryBgs) {
									Book.create(books).exec(function (err, books) {
										var category = _.find(categories, function (item) {
											return item && item.id == 1
										})

										books.forEach(function (book) {
											if (category && book)
												category.books.add(book)
										})

										BookReview.create(bookReviews).exec(function () {
											if (category)
												category.save().then(function () {
													cb()
												})
											else
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
	})
};
