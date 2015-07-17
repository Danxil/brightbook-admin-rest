var request = require('request');

var options = {
    headers: {
        'application-token': 'd5e7def9b581128e9fd2e3caaea249a13adec652fe27e4f52b8bb05422a6d8af'
    }
}

describe('api', function () {
    it('can be possible associate', function (done) {
        options.url = 'http://localhost:3000/v1/category/1/books/2'

        request.post(options, function (error, res) {
            if (error)
                return done(error)

            res.body = JSON.parse(res.body)

            if (res.body.code != 'OK')
                return done(res.body)

            done()
        });
    })

    it('can be possible get associate', function (done) {
        options.url = 'http://localhost:3000/v1/category/1/books/'

        request.get(options, function(error, res) {
            if (error)
                return done(error)

            res.body = JSON.parse(res.body)

            if (res.body.code != 'OK')
                return done(res.body)

            done()
        });
    })
});