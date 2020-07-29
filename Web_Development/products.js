module.exports = function(){
	var express = require('express');
	var router = express.Router();

// get all products in inventory
function getProducts(res, mysql, context, complete){
	mysql.pool.query("SELECT id, ProductName, StartingInventory, UnitsInStock, UnitsOnOrder, UnitPrice, RestockLevel FROM products", function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}	
		context.products = results;
		complete();
	});
}

// get a single product
function getProduct(res, mysql, context, id, complete){
	var sql = "SELECT id, ProductName, StartingInventory, UnitsInStock, UnitsOnOrder, UnitPrice, RestockLevel FROM products WHERE id = ?";
	var inserts = [id];
	mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.product = results[0];
		complete();
	});
}

/*Route to display all products. Requires web based javascript to delete with AJAX*/
router.get('/', function(req, res){
	var callbackCount = 0;
	var context = {};
	context.jsscripts = ["deleteProduct.js"];
	var mysql = req.app.get('mysql');
	getProducts(res, mysql, context, complete);
	function complete(){
		callbackCount++;
		if(callbackCount >= 1){
			res.render('products', context);
		}
	}
});

/*Display one product for the specific purpose of updating product */

router.get('/:id', function(req, res){
	callbackCount = 0;
	var context = {};
	context.jsscripts = ["updateProduct.js"];
	var mysql = req.app.get('mysql');
	getProduct(res, mysql, context, req.params.id, complete);
	function complete(){
		callbackCount++;
		if(callbackCount >= 1){
			res.render('update-product', context);
		}
	}
});

/* Add a product to the inventory, redirects to the products page after adding*/
router.post('/', function(req,res){
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO products (ProductName, StartingInventory, UnitsInStock, UnitsOnOrder, UnitPrice, RestockLevel) VALUES (?, ?, ?, ?, ?, ?)";
	var inserts = [req.body.ProductName, req.body.StartingInventory, req.body.UnitsInStock, req.body.UnitsOnOrder, req.body.UnitPrice, req.body.RestockLevel];
	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}else{
			res.redirect('/products');
		}
	});
});

 /* The URL that update data is sent to in order to update a product */
router.put('/:id', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "UPDATE products SET ProductName=?, StartingInventory=?, UnitsInStock=?, UnitsOnOrder=?, UnitPrice=?, RestockLevel=? WHERE id=?";
    var inserts = [req.body.ProductName, req.body.StartingInventory, req.body.UnitsInStock, req.body.UnitsOnOrder, req.body.UnitPrice, req.body.RestockLevel, req.params.id];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.status(200);
            res.end();
        }
    });
});

/* Route to delete a product, simply returns a 202 upon success. Ajax will handle this. */
router.delete('/:id', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM products WHERE id = ?";
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

