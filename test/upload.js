var supertest = require('supertest')('http://localhost:3000');
var assert = require('assert');
var path = require('path');

describe('#upload()', function(done) {
    it('should successfully set image', function (done) {
        var url = '/v1/upload';
        var image = process.cwd() + '/test/test.png';

        supertest
            .post(url)
            .set('Authorization', 'Token ')
            .attach('image', image)
            .end(function (err, res) {
                if (err)
                    return done(err);
                var imageID = parseInt(res.body.id) > 0;
                var userID = res.body.info;
                var imagePath = res.body.image;

                assert.strictEqual(res.statusCode, 200);
                assert.strictEqual(imageID, true);
                assert.equal(userID, id);

                done();
            });
    });
});