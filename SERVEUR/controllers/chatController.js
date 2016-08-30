module.exports.controller = function(app) {

	io = app.get('io');
        jwt = app.get('jwt');
        //var userConnected = jwt.verify(req.token, "secret");
        
	io.on('connection', function(socket) {
		//http://stackoverflow.com/questions/10110411/node-js-socket-io-how-to-emit-to-a-particular-client
		socket.on('send-new-message', function(data) 
                {
                    userConected = jwt.verify(data.token,'secret');
                    message = {
                                    emmeteur :userConected.login,
                                    content : data.content
                                };

                     socket.emit('nouveau-message', message);
                     socket.broadcast.emit('nouveau-message', message);
                });
		
		
	});

};