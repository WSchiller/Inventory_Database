module.exports = function(){
	var express = require('express');
	var router = express.Router();

// get all placed orders
function getOrders(res, mysql, context, complete){
	mysql.pool.query("SELECT orders.id, OrderDate, OrderPrice, suppliers.City AS Suppliers, CONCAT(buyers.FirstName,' ',buyers.LastName) AS Buyers FROM orders INNER JOIN suppliers ON orders.SupplierId=suppliers.id INNER JOIN buyers ON orders.BuyerID=buyers.id", function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}	
		context.orders = results;
		complete();
	});
}

function getSuppliers(res, mysql, context, complete) {
    mysql.pool.query("SELECT id, City, State FROM suppliers", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.suppliers = results;
        complete();
    });
}

function getBuyerName(res, mysql, context, complete) {
    mysql.pool.query("SELECT id, FirstName, LastName FROM buyers", function(error, results, fields){
       	if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.buyers = results;
        complete();
    });
}

// get a single product
function getOrder(res, mysql, context, id, completes){
	var sql = "SELECT id, OrderDate, OrderPrice, SupplierId, BuyerId FROM orders WHERE id = ?";
	var inserts = [id];
	mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.order = results[0];
		completes();
	});
}


/*Route to display all orders. Requires web based javascript to delete with AJAX*/
router.get('/', function(req, res){
	var callbackCount = 0;
	var context = {};
	context.jsscripts = ["deleteOrder.js"];
	var mysql = req.app.get('mysql');
	getOrders(res, mysql, context, complete);
	getSuppliers(res, mysql, context, complete);
	getBuyerName(res, mysql, context, complete);
	function complete(){
		callbackCount++;
		if(callbackCount >= 3){
			res.render('orders', context);
		}
	}
});

router.get('/:id', function(req, res){
	callbackCount = 0;
	var context = {};
	var mysql = req.app.get('mysql');
	getOrder(res, mysql, context, req.query.id, completes);
	function completes(){
		callbackCount++;
		if(callbackCount >= 1){
			console.log(context);
			res.render('orders', context);
		}
	}
});


/* Add an order, redirects to order page after adding*/

router.post('/', function(req,res){
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO orders (OrderDate, OrderPrice, SupplierId, BuyerId) VALUES (?, ?, ?, ?)";
	var inserts = [req.body.OrderDate, req.body.OrderPrice, req.body.SupplierId, req.body.BuyerId];
	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}else{
			res.redirect('/orders');
		}
	});
});

/* Route to delete a product, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM orders WHERE id = ?";
        var inserts = [req.params.id];
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