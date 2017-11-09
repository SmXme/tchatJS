function createUser(){
	$.ajax("http://messenger.api.niamor.com/createUser").done(function(myUser){
		console.log("Voici mon user :");
		console.log(myUser);
	});
}
$(document).ready(createUser);

function getUsers(){
	$.ajax("http://messenger.api.niamor.com/getUsers").done(function(myUsers){
		console.log("Voici mes users connectés :");
		console.log(myUsers);
	});
}
$(document).ready(getUsers);