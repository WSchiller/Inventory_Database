function deleteBuyer(id){
	$.ajax({
		url: '/buyers/' + id,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};