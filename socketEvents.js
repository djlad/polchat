console.log("socketEvents.js loaded")
module.exports = function(io){
	console.log("socket events have been added 1.1");

	io.on("connection",function(socket){
		socket.on("newChatListener",function(data){
			console.log(user2Sock);
			console.log(sock2User);
			//not using this because it is an insecure idea
		});
		socket.on("disconnect",function(){
			console.log("disconnecting");
			console.log(username);
			var username = sock2User[socket.id];
			if( typeof(username) !== "undefined"){
				console.log("updating user2sock and sock2user objects")
				delete sock2User[socket.id];
				delete user2Sock[username][socket.id];
			}
		})
	});
}
