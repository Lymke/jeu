module.exports.controller = function (app) {
    
    io = app.get('io');
    jwt = app.get('jwt');
    xss = require('xss');
    _und = require("underscore");
    //var tickrate = 40/1000;
    var tickrate = 1000;


    //Init the Map
    Map = require('../models/jeu/Map.js');
    var oMap = new Map().init("Alpha");

    /**
     * 
     * Don't forget : io.to(socketid).emit('message', 'whatever');
     */
    io.on('connection', function (socket) {

        socket.emit('message', 'Vous êtes bien connecté !');
        
        function animate(){
            
          oMap.animate();
          
          oDatasChanged = oMap.getDatasChanged();
          if(!_und.isEmpty(oDatasChanged)){
              socket.emit('game-change', oDatasChanged);
              socket.broadcast.emit('game-change', oDatasChanged);
          }
          setTimeout(animate, tickrate);
        };
        
        socket.on('player-add', function (data){
            if(oMap.isComplete()){
                socket.emit('message', 'La partie est complète');
            }else{
                oPlayer = oMap.addPlayer(socket.conn.id, data.sLogin);
                oDatas = oMap.getPublicInfos();
                oDatas.oMe = oPlayer.getPublicInfos();
                
                socket.emit('game-init', oDatas);
                socket.broadcast.emit('game-newplayer',oPlayer.getPublicInfos());
                
                if(oMap.isReady()){
                    animate();
                    socket.emit('game-start');
                    if(!oMap.bHasStarted ){
                        //the game begin so we call all players to say the game is starting
                        socket.broadcast.emit('game-start');
                    }
                    
                    //now the game has begun
                    oMap.bHasStarted  = true;
                }
            }
        });
        
        socket.on('game-moveto', function (oCoords){
            oCoords.iX = parseInt(oCoords.iX);
            oCoords.iY = parseInt(oCoords.iY);
            oPlayer = oMap.moveTo(socket.conn.id, oCoords);
            socket.emit('game-memove', oPlayer.getPublicInfos());
            socket.broadcast.emit('game-playermove', oPlayer.getPublicInfos());
        });
        
        socket.on('disconnect', function () {
            iId = oMap.subPlayer(socket.conn.id);
            socket.broadcast.emit('game-subplayer', iId);
        });
    });

};