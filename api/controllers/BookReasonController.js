/**
 * BookReasonController
 *
 * @description :: Server-side logic for managing bookreasons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  get: function(req, res) {
    BookReason.find({book: req.params.bookId})
      .populate('book')
      .populate('avatars')
      .then(function(BookReasons) {
        res.ok(BookReasons)
      }, function(err) {
        res.serverError(err)
      })
  }
};

