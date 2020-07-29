/*  
    Uses express, dbcon for database connection, body parser to parse form data 
    handlebars for HTML templates  
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();  // create new express application
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);  // load handlebars template engine to express application
app.use(bodyParser.urlencoded({extended:true}));  //parse bodies of all incoming request
app.use('/static', express.static('public'));  //serves resources from static folder
app.set('view engine', 'handlebars');
app.set('port', 3655); // define port to use
app.set('mysql', mysql);

app.use('/products', require('./products.js')); //parse application/json
app.use('/orders', require('./orders.js')); //parse application/json
app.use('/order_details', require('./order_details.js')); //parse application/json
app.use('/buyers', require('./buyers.js')); //parse application/json
app.use('/suppliers', require('./suppliers.js')); //parse application/json

//404 page not found error handler
app.use(function(req,res){
	res.status(404);
	res.render('404');
});

//500 server error handler
	app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

// listen on port 3655; log to console for a successful connection
app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port'));
});
