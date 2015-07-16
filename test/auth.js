var request = require('request');

var options = {
    headers: {
        'application-token': 'd5e7def9b581128e9fd2e3caaea249a13adec652fe27e4f52b8bb05422a6d8af'
    }
}

describe('api', function () {
    it('auth', function (done) {
        options.url = 'http://localhost:3000/v1/auth/signup/'

        options.form = {
            username: 'admin',
            password: 'admin',
            email: 'danxil@list.ru'
        }

        request.post('http://localhost:3000/v1/auth/signup/', options, function(error, res) {
            request.post('http://localhost:3000/v1/auth/signin/', options, function(error, res) {
                res.body = JSON.parse(res.body)

                if (res.body.code != 'OK')
                    return done(res.body)

                options.form.password = '11'

                request.post('http://localhost:3000/v1/auth/signin/', options, function(res, res) {
                    res.body = JSON.parse(res.body)

                    if (res.body.code != 'E_WRONG_PASSWORD')
                        return done(res.body)

                    done()
                })
            })
        }, function(error) {
            done(error)
        });
    });
});