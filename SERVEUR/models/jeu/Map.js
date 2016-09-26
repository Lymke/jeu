Convoi = require('./Convoi.js');
Base = require('./Base.js');
Player = require('./Player.js');
ListOfPlayers = require('./ListOfPlayers.js');
Personnage = require('./Personnage.js');
function Map() { 
	
        this.iWidth = 1000;
        this.iHeight = 500;
        this.iMaxPlayers = 2;
        this.iMinPlayers = 1;
        this.iIdAutoIncrement = 0;
        this.oListOfPlayers;
        this.oBlueSideBase;
        this.oRedSideBase;
        /**
         *  coordinates
         */
        this.oRoute = {
            sColor : "#333",
            oStart : {iX : 100, iY : 250},
            oEnd : {iX : 900, iY : 250},
            aCoordinates : [],
            oOrigineConvoi : {iX : 475, iY : 240}

        };
        
        this.createPLayer = function(iIdSocket,sLogin){
            oPlayer = new Player();
            oPlayer.iId = this.iIdAutoIncrement++;
            oPlayer.iIdSocket = iIdSocket;
            oPlayer.sLogin = sLogin;
            
            if(this.oListOfPlayers.count() < this.iMaxPlayers / 2){
                oPlayer.iSide = 0;
                oPlayer.oPersonnage = new Personnage().init('Azur').setCoordXY(75, 220);
            }else{
                oPlayer.iSide = 1;
                oPlayer.oPersonnage = new Personnage().init('Magenta').setCoordXY(925, 280);
            }
            return oPlayer;
            
        };
        
        this.isComplete = function(){
            return this.oListOfPlayers.count() >= this.iMaxPlayers;
        };
        
        this.isReady = function(){
            return this.oListOfPlayers.count() >= this.iMinPlayers;
        };
        
        this.addPlayer = function(oPlayer){
            this.oListOfPlayers.addPlayer(oPlayer);
        };
        
        /**
         * 
         * @param {type} iIdSocket
         * @returns this iId of the player
         */
        this.subPlayer = function(iIdSocket){
            return this.oListOfPlayers.subPlayer(iIdSocket);
        };
        
        
        this.click = function(iIdSocket, oCoords){
            
            for (p in this.oListOfPlayers.aPlayers) {
                if(this.oListOfPlayers.aPlayers[p].iIdSocket == iIdSocket){
                    this.oListOfPlayers.aPlayers[p].oPersonnage.moveTo(oCoords);
                    return this.oListOfPlayers.aPlayers[p];
                }
            }
        };
        
        this.getPublicInfos = function(){
             oDatas = {};
            
            //Route
            oDatas.oRoute = this.oRoute;
            
            //Convoi
            oDatas.oConvoi = this.oConvoi.getPublicInfos();
            
            //Bases
            oDatas.oBlueSideBase = this.oBlueSideBase.getPublicInfos();
            oDatas.oRedSideBase = this.oRedSideBase.getPublicInfos();
            
            //Players
            oDatas.aPlayers = [];
            for (p in this.oListOfPlayers.aPlayers) {
                oDatas.aPlayers.push(this.oListOfPlayers.aPlayers[p].getPublicInfos());
            };
            
            
            return oDatas;
        };
        
        this.init = function(){
            
            this.oListOfPlayers = new ListOfPlayers();
            
            //Bases
            this.oBlueSideBase = new Base().setName('blue').setCoordXY(0, 200).setDim(50, 100);                           
            this.oRedSideBase = new Base().setName('red').setCoordXY(950, 200).setDim(50, 100);
            
            //Convoi
            this.oConvoi = new Convoi();
            this.oConvoi.setCoordXY(this.oRoute.oOrigineConvoi.iX, this.oRoute.oOrigineConvoi.iY)
                        .setDim(50, 20)
                        .setVitesse(1); 
                
            return this;
        };
}
module.exports = Map;