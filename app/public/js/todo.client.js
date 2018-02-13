var new_item = document.getElementById("new_item");
var new_item_btn = document.getElementById("new_item_btn");
var list = document.getElementById("list");
var list_title = document.getElementById("list_title");
var items = document.getElementsByClassName("items")


	var url = document.URL;
	url = url.split("=");
	var id = url[1];


// Title functions
list_title.onblur = function(){
	// Update List Title

	$.ajax("/update_title", {
		type: "POST",
		data: {
			title: list_title.value, 
			id: id
		},
		success: function(res){
			if(res == 'OK'){
				console.log("All Good");
			} else {
				console.log("Something went wrong");
			}
		}
	})
}

list_title.onkeypress = function(e){
	if(e.keyCode == 13) {
		new_item.select();
	}
}

new_item_btn.onclick = function(){
	addItem();
}

new_item.onkeypress = function(e){
	if(e.keyCode == 13){
		addItem();
	}
}

function addItem(){
	console.log(items.length)
	var txt = new_item.value;
	new_item.value = "";
	new_item.select();

	var item = document.createElement("div");
	item.className = "panel-block";
	item.classList.add("items");

	item.innerHTML = '<div class="media"><div class="media-left"><i class="fa fa-times" onclick="deleteItem('+ items.length+1 +')"></i></div><div class="media-content"><div class="content">'+ txt +'</div></div></div>';

	list.appendChild(item);
	var date = new Date();
	var obj = {
		txt: txt,
		date: date.getTime(),
		id: id
	}
	postItem(obj)
}

function postItem(item){
	$.ajax("/new_item", {
		type: "POST",
		data: item,
		success: function(res){
			console.log(res)
		}
	});
}



// Delete Items
function deleteItem(i){
	$.ajax("/delete_item", {
		type: "POST",
		data: {
			index: i,
			id: id
		},
		success: function(res) {
			window.location.reload();
		}
	})
}