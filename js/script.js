myself=0;
function createUser(){
	$.ajax("http://messenger.api.niamor.com/createUser").done(function(myUser){
		myself = myUser;
		console.log(myself.authKey);
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
function sendMessage(){
	if (event.keyCode == 13){
		$('#ecrireText').val("");
	}
}
$('#ecrireText').keypress(sendMessage);