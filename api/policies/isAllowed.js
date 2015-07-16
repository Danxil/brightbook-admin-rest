/**
 * isAllowed
 * @description :: Policy to check if this request goes from our applications
 */

module.exports = function (req, res, next) {
  var token = req.headers['application-token'];

  if (token && token === "d5e7def9b581128e9fd2e3caaea249a13adec652fe27e4f52b8bb05422a6d8af") {
    next();
  } else {
    res.unauthorized(null, null, 'You must provide application token');
  }
};
