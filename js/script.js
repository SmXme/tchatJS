myself=0;
	function getMessages(){

	parameters = {
					url: 'http://messenger.api.niamor.com/getMessages',
					method: "post",
					data: {
						authKey : myself.authKey,
						lastId : 0
					}
			};


	$.ajax(parameters).done(function(messages){
		console.log(messages);
	});
}

function createUser(){
	$.ajax("http://messenger.api.niamor.com/createUser").done(function(myUser){
		myself = myUser;
		console.log(myself.authKey);
		getMessages();
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