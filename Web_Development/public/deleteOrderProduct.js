function deleteOrderProduct(pid){
	$.ajax({
		url: '/order_details/' + pid,
		type: 'DELETE',
		success: function(result){
			window.location.reload(true);
		}
	})
};