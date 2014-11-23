/*jslint node: true, forin: true, jslint white: true, newcap: true*/
/*
 * boot
 * author : Takeshi Iwana
 * https://github.com/iwatakeshi
 * license : MIT
 * Code heavily borrowed from Adam Draper
 * https://github.com/adamwdraper
 */

(function() {
    'use strict';

    var boot,
        _server,
        _app,
        _port,
        _opt,
        _defaults = {
            appName: 'Express app',
            debug: true,
            port: process.env.PORT || 3000
        },
        _opt = _defaults,
        _version = '0.0.3',
        _ = require('lodash'),
        cout = require('cout'),
        hasModule = (typeof module !== 'undefined' && module.exports);
    var Boot = function() {};

    /**
     * Main boot function that starts and stops your Express server.
     * @param  {Express Object} app
     * @param  {Number} port
     * @return {function}
     */
    boot = function(app, port) {

        if (app) {
            _server = require('http').Server(app);
            _port = app.get('port') || port || _opt.port;

            if (!_app) {
                _app = app;
            }
        }
        /**
         * Starts the server
         * @param  {Boolean} debug
         */
        Boot.start = function() {
            _server.listen(_port, function() {
                if (_opt.debug) {
                    cout(_opt.appName + ' started on http://localhost:' + _port).info();
                }
            });
        };
        /**
         * Stops the server
         */
        Boot.close = function() {
            _server.close();
        };

        if (_port) {
            Boot.port = _port;
        }

        if (_server) {
            Boot.server = _server;
        }
        if (_app) {
            Boot.app = _app;
        }
        return Boot;
    };
    /**
     * Returns boot's version
     * @type {String}
     */
    boot.version = _version;
    /**
     * Configures boot
     * @param  {Object} opt
     */
    boot.config = function(opt) {
        _opt = _.assign(_.extend(_defaults, opt));
    }

    /*************************************
      Exposing boot
    ************************************/

    // CommonJS module is defined
    if (hasModule) {
        module.exports = boot;
    }

    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `boot` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode
        this.boot = boot;
    }

    /*global define:false */
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return boot;
        });
    }
}).call(this);