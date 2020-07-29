// Load Express framework and route handling modules
module.exports = function(){
	var express = require('express');
	var router = express.Router();

// Get details of an order
function getOrderDetails(res, mysql, context, complete){
	mysql.pool.query("SELECT oid, pid, ProductQuantity, TotalUnitPrice FROM order_details", function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}	
		context.order_details = results;
		complete();
	});
}

function getOrderId(res, mysql, context, complete) {
    mysql.pool.query("SELECT id FROM orders", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.orders = results;
        complete();
    });
}

function getProductName(res, mysql, context, complete) {
    mysql.pool.query("SELECT id, ProductName FROM products", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.products = results;
        complete();
    });
}
	
	// Route to display details of all orders. 
	router.get('/', function(req, res){
	var callbackCount = 0;
	var context = {};
	context.jsscripts = ["deleteOrderProduct.js"];
	var mysql = req.app.get('mysql');
	getOrderDetails(res, mysql, context, complete);
	getOrderId(res, mysql, context, complete);
	getProductName(res, mysql, context, complete);
	function complete(){
		callbackCount++;
		if(callbackCount >= 3){
			res.render('order_details', context);
		}
	}
});

// Add a product to an order, redirects to order_details page after adding
router.post('/', function(req,res){
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO order_details (oid, pid, ProductQuantity, TotalUnitPrice) VALUES (?, ?, ?, ?)";
	var inserts = [req.body.oid, req.body.pid, req.body.ProductQuantity, req.body.TotalUnitPrice];
	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}else{
			res.redirect('/order_details');
		}
	});
});

// Route to remove a product from an order, simply returns a 202 upon success. Ajax will handle this.
router.delete('/:pid', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM order_details WHERE pid = ?";
    var inserts = [req.params.pid];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
           	res.status(400);
            res.end();
        }else{
            res.status(202).end();
        }
    })
})
	return router;
}();
	
