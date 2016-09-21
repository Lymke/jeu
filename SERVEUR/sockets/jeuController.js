module.exports.controller = function (app) {
    Game = require('../models/jeu/Game.js');
    game = new Game();
    io = app.get('io');
    jwt = app.get('jwt');
    xss = require('xss');
    //var userConnected = jwt.verify(req.token, "secret");
    var aPlayers = [];

    /**
     * 
     * Don't forget : io.to(socketid).emit('message', 'whatever');
     */
    io.on('connection', function (socket) {

        socket.emit('message', 'Vous êtes bien connecté !');

        socket.on('ready', function (data)
        {
            game.addPlayer(socket.conn.id, data.sLogin);
            socket.emit('message', 'Bienvenue ' + data.sLogin);
            res = {aPlayers: game.getPlayersWithoutId()};
            socket.emit('infos-players', res);
            socket.broadcast.emit('infos-players', res);
            
            //If the game is ready to play, we can begin
            if(game.isReady()){
                game.start();
            }
            
            
            
        });

        socket.on('send-message', function (sMessage)
        {
            if (socket.conn.id in game.aPlayers) {
                res = {sLogin: xss(game.aPlayers[socket.conn.id].sLogin), sMessage: xss(sMessage)};
                socket.emit('newmessage', res);
                socket.broadcast.emit('newmessage', res);
            }
        });

        socket.on('disconnect', function () {
            console.log(socket.conn.id + ' has disconnected');
            game.subPlayer(socket.conn.id);
            console.log("Vous etes maintenant " + game.oListPlayers.count());
            res = {aPlayers: game.getPlayersWithoutId()};
            socket.broadcast.emit('infos-players', res);
        });

    });

};