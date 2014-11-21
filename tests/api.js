var app = require('express')(),
    boot = require('../boot.js'),
    superagent = require('superagent'),
    expect = require('expect.js');


describe('Boot API', function() {
    before(function(done) {
        app.get('/', function(req, res) {
            res.send('Hello World')
        });
        boot.config({debug:false})
        boot(app).start();
        done();
    });
    
    after(function() {
        boot().close();
    });
    
    describe('boot.version', function () {
        it('should return version', function (done) {
            expect(typeof boot.version).to.equal(typeof "");
            done();
        });
    });

    describe('boot().app', function() {
        it('should return app', function(done) {
            expect(boot().app).to.not.equal(undefined);
            done();
        });
    });

    describe('boot().server', function() {
        it('should return server', function(done) {
            expect(boot().server).to.not.equal(undefined);
            done();
        });
    });
    describe('boot().port', function() {
        describe('default', function() {
            it('should return 3000', function(done) {
                expect(boot().port).to.equal(3000);
                done();
            });
        });
        describe('configured', function() {
            before(function() {
                //stop server
                boot().close();
                //configre
                boot.config({
                    port: 8080
                });
                //start it up
                boot(app).start();
            });
            it('should return 8080', function(done) {
                expect(boot().port).to.equal(8080);
                done();
            });
        });


    });
});