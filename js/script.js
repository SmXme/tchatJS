function createUser(){

	$.ajax("http://messenger.api.niamor.com/createUser").done(function(mesData){
		console.log(mesData);
	});
}

$(document).ready(createUser);