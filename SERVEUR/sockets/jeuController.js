module.exports.controller = function(app) {

	io = app.get('io');
    jwt = app.get('jwt');
    //var userConnected = jwt.verify(req.token, "secret");
        
	io.on('connection', function(socket) {
		socket.emit('message', 'Vous êtes bien connecté ! hahahah !!!');
		//http://stackoverflow.com/questions/10110411/node-js-socket-io-how-to-emit-to-a-particular-client
		socket.on('send-new-message', function(data) 
        {  console.log('New message ! ',data);
		   message = 'hello';
           socket.emit('nouveau-message', message);
           socket.broadcast.emit('nouveau-message', message);
       });
		
		
	});

};