$(function () {

    ///////////////////// CANVAS 
    var canvas = document.getElementById("mon_canvas");
    var ctx = canvas.getContext("2d");
    canvas.onselectstart = function () {
        return false;
    }//prevent double-click

    /**
     * Add the click event to the canvas object
     * @param {type} event
     * @returns {main_L1.relMouseCoords.mainAnonym$0}
     */
    function relMouseCoords(event) {
        var rect = canvas.getBoundingClientRect();
        return {
            iX: Math.floor((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
            iY: Math.round((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
        };
    }
    HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;


    //Game
    var oToile = new Toile(canvas, ctx);
    var oMap = new Map(oToile).setFps(60);
    var bPause = 0;
    
    //Animate
    function animate()
    {   oMap.animate();
        if(bPause == 0){
            setTimeout(animate, 1000 / oMap.iFps);
        }
    }
    
    function play(){
        bPause = 0;
        animate();
    }
    function pause(){
        bPause = 1;
    }
    document.getElementById("btnNextFrame").addEventListener("click", animate);
    document.getElementById("btnPlay").addEventListener("click", play);
    document.getElementById("btnPause").addEventListener("click", pause);

    ///////////////////// SOCKETS
    var socket = io.connect('http://localhost:8080');
    
    
    //Join the game
    $('#btn_ready').click(function () {
        var sLogin =  $('#sLogin').val();
        socket.emit('player-add', {sLogin:sLogin});
        $('#divGame').show();
        $('#formReady').hide();
        $('#headerLogin').html(sLogin);
    });
    
    
    //Init the game
    socket.on('game-init', function (oDatas) {
        //The map
        oMap.init(oDatas);//Decors, bases, convoi, route....

        //Draw the game
        oMap.draw();
    });
    
    //Add a player
    socket.on('game-newplayer', function (oDatasPlayer) {
        if(oMap.oMe != undefined){
            oPlayer = new Player().init(oDatasPlayer);
            oPlayer.setPersonnage(new Personnage(oToile).init(oDatasPlayer.oPersonnage));
            oMap.oListOfPlayers.addPlayer(oPlayer);
            oMap.draw();
        }
    });
    
    //Sub a player
    socket.on('game-subplayer', function (iId) {
        if(oMap.oMe != undefined){
            oMap.oListOfPlayers.subPlayer(iId);
            oMap.draw();
        }
    });
    
    //The game starts
     socket.on('game-start', function (iId) {
        
        if(oMap.oMe != undefined){
            animate();
        }
    });
    
    //The game change
     socket.on('game-change', function (oDatasChanged) {
        oMap.oConvoi.iAngle = oDatasChanged.oConvoi.iAngle;
        oMap.oConvoi.oDestination = oDatasChanged.oConvoi.oDestination;
        oMap.oConvoi.iTimestamp = oDatasChanged.oConvoi.iTimestamp;
    });
    
    //Clic on the map
    function clickCanvas(event) {
        oCoords = canvas.relMouseCoords(event);
        oMap.click(oCoords);
        socket.emit('game-moveto', oCoords);
    }
    canvas.addEventListener("click", clickCanvas);
    
    //A player has moved
    socket.on('game-playermove', function (oDatasPlayer) {
        if(oMap.oMe != undefined){
            oMap.playerMove(oDatasPlayer);
        }
    });
    
    
    
});

