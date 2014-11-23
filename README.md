express-boot
============

A simple Express middleware to start and stop the server.

[![Build Status](https://travis-ci.org/iwatakeshi/express-boot.svg)](https://travis-ci.org/iwatakeshi/express-boot)
[![npm version](https://badge.fury.io/js/express-boot.svg)](http://badge.fury.io/js/express-boot)

[![NPM](https://nodei.co/npm/express-boot.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/express-boot/)


##Install

```bash
sudo npm install --save express-boot
```

##Usage

```js

var app = require('express')();
var boot = require('express-boot');

/*...*/

//At the end, start the server
if(require.main === module){
    boot(app).start();
} else {
//In case you want to use app in your tests.
  module.exports = app;
}
 
```

Then run:
```bash
npm start
```

*If you want to use `app.set` to set your port then just pass `app` to `boot()`* 

**Socket.io**

```js
var app = require('express')();
var boot = require('express-boot')(app);
var io = require('socket.io')(boot().server);
```

##API

`boot(app, port)`

* *Accepts the Express app and/or port number*

`boot().start()`

* *Starts the Express server*

`boot().close()`

* *Closes the Express server*

`boot().server`

* *Returns the http server*

`boot().app`

* *Returns the Express app*

`boot.version`

* *Returns boot's version*

`boot.config(opt)`

* *Configures boot*

**_Options_**
```
//default
{
  appName: 'Express app',
  port: process.env.PORT || 3000,
  debug: true
}
```

##Test

```bash
npm test
```

##Changelog

**Latest:**

**0.0.1**

* Initial Commit

**0.0.2**

* Updated readme

**0.0.3**

* Port now defaults to `process.env.PORT || 3000`.
* Updated readme
