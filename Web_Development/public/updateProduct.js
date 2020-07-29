//sends ajax request to products url along with data to update row at id
function updateProduct(id){
	$.ajax({
		url: '/products/' + id,
		type: 'PUT',
		data: $('#update-product').serialize(),
		success: function(result){
			window.location.replace("./");
		}
	})
};