//database connection.
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var pool = mysql.createPool({        // create the pool
  connectionLimit: 10,
  host  : 'xxxxxxxxxx',
  user  : 'xxxxxxx',
  password: 'xxxxxxxxx',
  database: 'xxxxxxxxxx'
});
module.exports.pool = pool;