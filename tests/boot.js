var app = require('express')(),
    boot = require('../boot.js'),
    superagent = require('superagent'),
    expect = require('expect.js');

describe('Express Server', function() {
    before(function() {
        app.get('/', function(req, res) {
            res.send('Hello World')
        });
        boot(app).start();
    });

    describe('Express start', function() {
        it('should respond to GET', function(done) {
            superagent
                .get('http://localhost:' + boot().port)
                .end(function(res) {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });

    describe('Express close', function() {
        before(function(done) {
            boot().close();
            done();
        });

        it('should not respond to GET', function(done) {
            superagent
                .get('http://localhost:' + boot().port)
                .end(function(error, res) {
                    expect(error.code).equal('ECONNREFUSED');
                    done();
                });
        });
    });
});