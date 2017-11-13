var myself={};
laAuthKey = 0;
if (testCookie() == true){
	var leCookie = document.cookie;
	var pos = leCookie.search("=");
	var laAuthKey = leCookie.slice(pos+1, leCookie.length);
	getUser();
}else {
	createUser();
}

	function changeUsername (aPseudo){
		parameterSetUsername = {
			url:'http://messenger.api.niamor.com/changeUsername',
			method:'post',
			data: {
				authKey: myself.authKey,
				username: aPseudo
			}
		};
		$.ajax(parameterSetUsername).done(function(changedUser){
			// myself["id"] = monUser.id;
			// myself["username"] = monUser.username;
			// myself["createdAt"] = monUser.createdAt;
			// myself["lastMessageAt"] = monUser.lastMessageAt;
			// myself["authKey"] = laAuthKey;
			console.log(changedUser);
		});

	}
	function testCookie (){
		if (document.cookie == "")res = false;
		else res = true;
		return res;
	}
	function getUser(){
		parametersGetUser = {
							url: 'http://messenger.api.niamor.com/getUser',
							method: "post",
							data: {
								authKey: laAuthKey,
							}
						};
		$.ajax(parametersGetUser).done(function(monUser){
		console.log(monUser);
		myself["id"] = monUser.id;
		myself["username"] = monUser.username;
		myself["createdAt"] = monUser.createdAt;
		myself["lastMessageAt"] = monUser.lastMessageAt;
		myself["authKey"] = laAuthKey;
		});
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
	posCommand = (txtMsg.search("/"));
	if (posCommand == 0){
			if(txtMsg == "/help"){
				$('#ecrireText').attr("placeholder","Tapez /changename suivi d'un pseudo pour changer de pseudo");
			}
			if (txtMsg.search("/changename")!= -1){
				var posSpace = txtMsg.search(" ");
				var pseudo = txtMsg.slice(posSpace+1, txtMsg.length);
				changeUsername(pseudo);
				console.log('')
			}
		return false;
	}	
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
		document.cookie = "cookieAuthKey="+myself.authKey;
	});
}

function getUsers(){
	$.ajax("http://messenger.api.niamor.com/getUsers").done(function(myUsers){
		for (i = 0 ; i < myUsers.length ; i++){
			$('#affichageUtilisateur').append("<p class='pUsername'>"+myUsers[i].username+"</p>");
		 }
	});
}

$(document).ready(getUsers);
$(document).ready(setInterval(getMessages, 2000)); 