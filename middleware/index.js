'use strict';

const bodyParser      = require('body-parser');
const morgan          = require('morgan');
const underscore      = require('underscore');
const envProperties   = require('../properties/envProperties');

global._          = underscore;

app.use(function (req, res, next){
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE');
  res.setHeader("Access-Control-Allow-Headers", 'X-Requested-With, content-type, access-token');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(bodyParser.json({limit: "50mb"}));

app.use(morgan('dev'));

console.log("Server Environment Running at: ", app.get('env'));

app.set('port', envProperties.port);