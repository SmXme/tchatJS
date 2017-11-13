myself=0;
if (testCookie() == true){
	console.log("Cookie plein");
}else console.log("Cookie vide");

function testCookie (){
	if (document.cookie == "")res = false;
	else res = true;
	return res;
}

function testEnter (){
	if (event.keyCode == 13){
		console.log("Tu as appuyé sur entrer");
		sendMessages();
	}
}
function sendMessages(){
	txtMsg = $('#ecrireText').val();
	$('#ecrireText').val(""); 
	parametersSet = {
					url: 'http://messenger.api.niamor.com/sendMessage',
					method: "post",
					data: {
						authKey: myself.authKey,
						text: txtMsg,
						to: 0
					}
			};

	$.ajax(parametersSet).done(function(){
		console.log("message envoyé");
		getMessages();
	});
}
$('#ecrireText').keypress(testEnter)
$('#buttonEnvoieMessage').click(sendMessages);

	function getMessages(){

	parametersGet = {
					url: 'http://messenger.api.niamor.com/getMessages',
					method: "post",
					data: {
						authKey : myself.authKey,
						lastId : 0
					}
			};


	$.ajax(parametersGet).done(function(messages){
		console.log(messages);
		displayMessages(messages);
	});
}
function displayMessages(someMessages){
	$('#chatBox').html("");
	for (i = 0 ; i < someMessages.length ; i++){

		laDate = someMessages[i].createdAt; 

		if(someMessages[i].from.id != myself.id){
			$('#chatBox').append("<div class='divMsgForMe'><p class='pInfoMsg'>Message de "+
			someMessages[i].from.username+" à : "+
			laDate+"<p>"+someMessages[i].text+
			"</p></div>");
		}else $('#chatBox').append("<div class='divMsgByMe'><p class='pInfoMsg'>Message de "+
			someMessages[i].from.username+" à : "+
			laDate+"<p>"+someMessages[i].text+
			"</p></div>");
	}
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
$(document).ready(setInterval(getMessages, 2000)); 