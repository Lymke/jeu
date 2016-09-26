module.exports.controller = function (app) {
    
    io = app.get('io');
    jwt = app.get('jwt');
    xss = require('xss');
    //var tickrate = 40/1000;


    //Init the Map
    Map = require('../models/jeu/Map.js');
    var oMap = new Map().init();


    /**
     * 
     * Don't forget : io.to(socketid).emit('message', 'whatever');
     */
    io.on('connection', function (socket) {

        socket.emit('message', 'Vous êtes bien connecté !');
        
        socket.on('player-add', function (data){
            if(oMap.isComplete()){
                socket.emit('message', 'La partie est complète');
            }else{
                oPlayer = oMap.createPLayer(socket.conn.id, data.sLogin);
                oMap.addPlayer(oPlayer);
                
                oDatas = oMap.getPublicInfos();
                oDatas.oMe = oPlayer.getPublicInfos();
                
                socket.emit('game-init', oDatas);
                socket.broadcast.emit('game-newplayer',oPlayer.getPublicInfos());
                
                if(oMap.isReady()){
                    socket.emit('game-start');
                    socket.broadcast.emit('game-start');
                }
            }
        });
        
        socket.on('game-moveto', function (oCoords){
            oPlayer = oMap.click(socket.conn.id,oCoords);
            
            //For now we calc in client side too, it could be better to send the already calced infos
            socket.emit('game-playermove', {'oCoords' : oCoords, 'iId' : oPlayer.iId});
        });
        
        socket.on('disconnect', function () {
            iId = oMap.subPlayer(socket.conn.id);
            socket.broadcast.emit('game-subplayer', iId);
        });
    });

};