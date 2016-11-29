Convoi = require('./Convoi.js');
Base = require('./Base.js');
Player = require('./Player.js');
ListOfPlayers = require('./ListOfPlayers.js');
Personnage = require('./Personnage.js');
function Map() { 
	this.bHasStarted = false;
        this.iWidth = 1000;
        this.iHeight = 500;
        this.iMaxPlayers = 6;
        this.iMinPlayers = 1;
        this.iIdAutoIncrement = 0;
        this.oListOfPlayers;
        this.oBlueSideBase;
        this.oRedSideBase;
        this.oInfos;//
        
        /**
         *  coordinates
         */
        this.oRoute = {
            oStart : {iX : 100, iY : 250},
            oEnd : {iX : 900, iY : 250},
            aCoordinates : [],
            oOrigineConvoi : {iX : 475, iY : 240}

        };
        
        
        this.isComplete = function(){
            return this.oListOfPlayers.count() >= this.iMaxPlayers;
        };
        
        this.isReady = function(){
            return this.oListOfPlayers.count() >= this.iMinPlayers;
        };
        
        this.addPlayer = function(iIdSocket,sLogin){
            oPlayer = new Player();
            oPlayer.iId = this.iIdAutoIncrement++;
            oPlayer.iIdSocket = iIdSocket;
            oPlayer.sLogin = sLogin;
            
            aCount = this.oListOfPlayers.countBySide();

            if(aCount[0] <= aCount[1] ){
                oPlayer.iSide = 0;
                oPlayer.oPersonnage = new Personnage().init('Azur').setCoordXY(75, 220);
            }else{
                oPlayer.iSide = 1;
                oPlayer.oPersonnage = new Personnage().init('Magenta').setCoordXY(925, 280);
            }
            this.oListOfPlayers.addPlayer(oPlayer);
            return oPlayer;
        };
        
        /**
         * 
         * @param {type} iIdSocket
         * @returns this iId of the player
         */
        this.subPlayer = function(iIdSocket){
            return this.oListOfPlayers.subPlayer(iIdSocket);
        };
        
        
        this.moveTo = function(iIdSocket, oCoords){
            
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
        
/////////////////////Animate
        
        this.animatePlayers = function(){
            for(p in this.oListOfPlayers.aPlayers){
                
                oNewPosition = this.oListOfPlayers.aPlayers[p].oPersonnage.calcPositionMove();
                this.oListOfPlayers.aPlayers[p].oPersonnage.move(oNewPosition);
            } 
        };
        
        this.animateConvoi = function(){
            
            aCptSide = [0,0];            
            for(p in this.oListOfPlayers.aPlayers){
                
                if(this.oConvoi.isNear(this.oListOfPlayers.aPlayers[p].oPersonnage)){
                    
                    if(aCptSide[this.oListOfPlayers.aPlayers[p].iSide] == undefined){
                        aCptSide[this.oListOfPlayers.aPlayers[p].iSide] = 0;
                    }
                    
                    aCptSide[this.oListOfPlayers.aPlayers[p].iSide]++;
                }
                
            }
            
            //There is only 2 sides for the moment.
            //This code can be improved
            if(this.oConvoi.iDirection != 1 && aCptSide[0] > aCptSide[1]){
                this.oConvoi.iDirection = 1;
                this.oConvoi.bStop = false;
                this.oConvoi.moveTo(this.oRoute.oEnd);
            }else if(this.oConvoi.iDirection != null && aCptSide[0] == aCptSide[1]){
                this.oConvoi.iDirection = null;
                this.oConvoi.bStop = true;
            }else if(this.oConvoi.iDirection != 0 && aCptSide[0] < aCptSide[1]){
                this.oConvoi.iDirection = 0;
                this.oConvoi.bStop = false;
                this.oConvoi.moveTo(this.oRoute.oStart);
            }
            
            this.oConvoi.move(this.oConvoi.calcPositionMove());
        };
        
        this.animate = function(){
            this.animatePlayers();
            this.animateConvoi();
        };
        
        this.getDatasChanged = function(){
            oInfos = this.getPublicInfos();
            oDatasChanged = {};
            
            //Convoi
            if(this.oInfos.oConvoi.iDirection != oInfos.oConvoi.iDirection){
                oDatasChanged.oConvoi = oInfos.oConvoi;
            }
            
            this.oInfos = oInfos;
            return oDatasChanged;
        }
        
//////////////////INIT
        
        this.init = function(){
            
            this.oListOfPlayers = new ListOfPlayers();
            
            //Bases
            this.oBlueSideBase = new Base().setName('blue').setCoordXY(0, 200).setDim(50, 100);                           
            this.oRedSideBase = new Base().setName('red').setCoordXY(950, 200).setDim(50, 100);
            
            //Convoi
            this.oConvoi = new Convoi();
            this.oConvoi.setCoordXY(this.oRoute.oOrigineConvoi.iX, this.oRoute.oOrigineConvoi.iY)
                        .setDim(50, 20)
                        .setVitesse(45)
                        .setDistanceMove(100); 
            this.oInfos = this.getPublicInfos();    
            return this;
        };
}
module.exports = Map;