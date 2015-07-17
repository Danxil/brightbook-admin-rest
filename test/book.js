var request = require('request');

var options = {
    headers: {
        'application-token': 'd5e7def9b581128e9fd2e3caaea249a13adec652fe27e4f52b8bb05422a6d8af'
    }
}

describe('api', function () {
    it('can be possible crud', function (done) {
        options.url = 'http://localhost:3000/v1/auth/signup/'

        options.form = {
            name: 'book1'
        }

        request.post('http://localhost:3000/v1/book/', options, function(error, res) {
            if (error)
                return done(error)

            res.body = JSON.parse(res.body)

            if (res.body.code != 'CREATED')
                return done(res.body)

            options.form.name = 'book-edited'

            request.put('http://localhost:3000/v1/book/' +  + res.body.data.id, options, function(error, res) {
                if (error)
                    return done(error)

                res.body = JSON.parse(res.body)

                if (res.body.code != 'OK' || res.body.data.name != options.form.name)
                    return done(res.body)

                request.del('http://localhost:3000/v1/book/' + res.body.data.id, options, function (error, res) {
                    if (error)
                        return done(error)

                    res.body = JSON.parse(res.body)

                    if (res.body.code != 'OK')
                        return done(res.body)

                    done()
                })
            })
        });
    });
});