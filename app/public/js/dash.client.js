// Delete List

function deleteList(list_id) {
	if(confirm("Delete This List")) {
		$.ajax("delete_list", {
			type: "POST",
			data: {id: list_id},
			success: function(res){
				window.location.reload();
			}
		})
	}
}