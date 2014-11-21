express-boot
============

A simple Express middleware to start and stop the server.

##Install

```bash
sudo npm install --save express-boot
```

##Usage

```js
var app = require('express')();
var boot = require('express-boot')(app, process.env.PORT || 3000);

/*...*/

//At the end, start the server
if(require.main === module){
    boot().start();
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
var boot = require('express-boot')(app, process.env.PORT || 3000);
var io = require('socket.io')(boot().server);
```

##API

`boot(app, port)`

* *Accepts the Express app and port number*

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
  port: 3000,
  debug: true
}
```

