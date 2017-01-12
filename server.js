console.log('Start of server.js');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('IMPORTANT==>  process.env.NODE_ENV=' + process.env.NODE_ENV);


var mongoose = require('./config/mongoose');
var express = require('./config/express');
var passport = require('./config/passport');
var db = mongoose();
var app = express();
app.listen(3000);

module.exports = app;

console.log('Server running at http://localhost:3000/');
