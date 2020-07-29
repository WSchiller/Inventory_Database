function deleteSupplier(id){
	$.ajax({
		url: '/suppliers/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};