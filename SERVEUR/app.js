//Require modules

    var express = require('express');
    var bodyParser = require('body-parser');
    var http = require('http');
    var path = require('path');
    var app = express();
    var fs = require('fs');
    var colors      = require('colors');
    var session      = require('express-session');
    var jwt = require('jsonwebtoken');
    app.set('jwt',jwt);


//Configs

    config = require('./config/config');
    app.set('config',config);

    sessionConfig = {
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    };
    
    var sessionMiddleware = session(sessionConfig);
    app.use(sessionMiddleware);
      
// Define the port

    app.set('port', process.env.PORT || config.port ||3000);

//Body parser

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

//Models are autoloads in ./models/index.js

    app.set('db', require('./models/db'));


//CORS SETTING : accept cross domain

    app.use(function(req, res, next) 
    {   
        res.header("Access-Control-Allow-Origin", config.origin_allowed);
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //res.header("Access-Control-Allow-Credentials", "false");
        next();
    });


//Define services

    authenticationService = require('./service/authenticationService');
    authenticationService.init(app);
    app.set('authenticationService',authenticationService);

//Create server

    server = http.createServer(app);
   
//Init sockets

    var io = require('socket.io')(server);
    app.set('io',io);

    io.use(function(socket, next) {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

// Autoload controllers, routes are defined in controllers

    fs.readdirSync('./controllers').forEach(function (file) 
    {
      if(file.substr(-3) == '.js') {
          route = require('./controllers/' + file);
          route.controller(app);
      }
    });
	
// Autoload sockets

    fs.readdirSync('./sockets').forEach(function (file) 
    {
      if(file.substr(-3) == '.js') {
          route = require('./sockets/' + file);
          route.controller(app);
      }
    });
    

    
//Starting server

    server.listen(app.get('port'), function()
    {
        console.log(('Express server listening on port ' + app.get('port')).green);
    });