/**
 * BookReviewController
 *
 * @description :: Server-side logic for managing bookreviews
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get: function(req, res) {
    BookReview.find({book: req.params.bookId})
      .populate('book')
      .populate('avatars')
      .then(function(BookReviews) {
        res.ok(BookReviews)
      }, function(err) {
        res.serverError(err)
      })
  }
};

