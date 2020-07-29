module.exports = function(){
	var express = require('express');
	var router = express.Router();

// get all suppliers from database
function getSuppliers(res, mysql, context, complete){
	mysql.pool.query("SELECT id, City, State FROM suppliers", function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}	
		context.suppliers = results;
		complete();
	});
}

/*Route to display all suppliers to web page. */
router.get('/', function(req, res){
	var callbackCount = 0;
	var context = {};
	context.jsscripts = ["deleteSupplier.js"];
	var mysql = req.app.get('mysql');
	getSuppliers(res, mysql, context, complete);
	function complete(){
		callbackCount++;
		if(callbackCount >= 1){
			res.render('suppliers', context);
		}
	}
});

/* Add a supplier to database, redirects to order page after adding*/
router.post('/', function(req,res){
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO suppliers (City, State) VALUES (?, ?)";
	var inserts = [req.body.City, req.body.State];
	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}else{
			res.redirect('/suppliers');
		}
	});
});

/* Route to delete a supplier from database, simply returns a 202 upon success. Ajax will handle this. */
router.delete('/:id', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM suppliers WHERE id = ?";
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
