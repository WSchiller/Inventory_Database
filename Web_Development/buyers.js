module.exports = function(){
	var express = require('express');
	var router = express.Router();

// Get all buyers from directory
function getBuyers(res, mysql, context, complete){
	mysql.pool.query("SELECT id, FirstName, LastName, StreetAddress, City, State, ZipCode, Phone, Email FROM buyers", function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}	
		context.buyers = results;
		complete();
	});
}

// Route to display all buyers. Requires web based javascript to delete with AJAX
router.get('/', function(req, res){
	var callbackCount = 0;
	var context = {};
	context.jsscripts = ["deleteBuyer.js"];
	var mysql = req.app.get('mysql');
	getBuyers(res, mysql, context, complete);
	function complete(){
		callbackCount++;
		if(callbackCount >= 1){
			res.render('buyers', context);
		}
	}
});

// Add a buyer, redirects to order page after adding
router.post('/', function(req,res){
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO buyers (FirstName, LastName, StreetAddress, City, State, ZipCode, Phone, Email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
	var inserts = [req.body.FirstName, req.body.LastName, req.body.StreetAddress, req.body.City, req.body.State, req.body.ZipCode, req.body.Phone, req.body.Email];
	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}else{
			res.redirect('/buyers');
		}
	});
});

// Route to delete a buyer, simply returns a 202 upon success. Ajax will handle this. 
router.delete('/:id', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM buyers WHERE id = ?";
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
