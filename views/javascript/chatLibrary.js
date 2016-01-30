function ajaxRequest(method,url,callBack){
	var xmlhttp;
	if (window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	}else{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			callBack(xmlhttp);
		}
	}
	
	xmlhttp.open(method,url,true);
	xmlhttp.send();
}

chat = (function makeChatObject(){
	function sendMessage(to,content,issue){
		issue = typeof issue !== "undefined"?issue:"pm";

		ajaxRequest("GET","sendMessage?to="+to+"&content="+content+"&issue="+issue,function(response){
			console.log(response.responseText);
		});
	}

	function getConversation(from,callback){
		//from is the user who sent you the message
		//you only need this function if you want to optimize
		ajaxRequest("GET","getConversation?from="+from,function(response){
			callback(response.responseText);
		});
	}

	function getAllMessages(callBack,lastUpdateDate){
		//lastUpdateDate is in milliseconds since 1969

		//if lastUpdateDate not set get all messages since last update 
		if (typeof lastUpdateDate == 'undefined') {
			lastUpdateDate = this.lastUpdateDate;
			this.lastUpdateDate = (new Date).getTime();
		}

		ajaxRequest("GET","getAllMessages?lastUpdateDate="+lastUpdateDate,function(newMessages){
			//console.log(newMessages);
			//$("body").append(newMessages.responseText);
			
			callBack(newMessages);
		});
	}

	function registerNewChatListener(){
		ajaxRequest("GET","/newChatListener?socketid="+socket.id,function(){});
	}
	function getMatches(callBack){
		ajaxRequest("GET","/getMatches" ,function(matchesResponse){
			callBack(matchesResponse);
		});
	}
	function lookForMatch(issue,callBack){
		ajaxRequest("GET","/lookForMatch?issue="+issue,function(matchesResponse){
			console.log(matchesResponse);
		});
	}

	chat = {
		lastUpdateDate:(new Date).getTime() - 864000000,//now minus 10 days in ms
		getAllMessages,
		sendMessage,
		getConversation,
		registerNewChatListener,
		getMatches,
		lookForMatch
	}
	return chat;
})()
