function createUser(){
	$.ajax("http://messenger.api.niamor.com/createUser").done(function(myUser){
		console.log("Voici mon user :");
		console.log(myUser);
	});
}
$(document).ready(createUser);

function getUsers(){
	$.ajax("http://messenger.api.niamor.com/getUsers").done(function(myUsers){
		for (i = 0 ; i < myUsers.length ; i++){
			$('#affichageUtilisateur').append("<p class='pUsername'>"+myUsers[i].username+"</p>");
		 }
	});
}
$(document).ready(getUsers);
