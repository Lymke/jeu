Convoi = require('./Convoi.js');
Base = require('./Base.js');
Player = require('./Player.js');
ListOfPlayers = require('./ListOfPlayers.js');
Personnage = require('./Personnage.js');
function Map() { 
	this.bHasStarted = false;
        this.iWidth;
        this.iHeight;
        this.iMaxPlayers;
        this.iMinPlayers;
        this.iIdAutoIncrement = 0;
        this.oListOfPlayers;
        this.oBlueSideBase;
        this.oRedSideBase;
        this.oInfos;//
        
        /**
         *  coordinates
         */
        this.oRoute;
        
        
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
                oPlayer.oPersonnage = new Personnage().init('Azur').setCoordXY(20, 30);
            }else{
                oPlayer.iSide = 1;
                oPlayer.oPersonnage = new Personnage().init('Magenta').setCoordXY(180, 70);
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
            
            //Map
            oDatas.oMap = {};
            oDatas.oMap.iWidth = this.iWidth;
            oDatas.oMap.iHeight = this.iHeight;
            
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
                console.log('Initial : ',this.oListOfPlayers.aPlayers[p].oPersonnage.oPosition);
                console.log('Destination : ',this.oListOfPlayers.aPlayers[p].oPersonnage.oDestination);
                oNewPosition = this.oListOfPlayers.aPlayers[p].oPersonnage.calcPositionMove();
                console.log('New Position : ',oNewPosition);
                
                if(    !this.oListOfPlayers.aPlayers[p].oPersonnage.bStop 
                    && !this.verifyCollisionsPersonnage(this.oListOfPlayers.aPlayers[p].oPersonnage,oNewPosition)){
                    //the personnage is not in stop or in collision if he goes at this point
                    this.oListOfPlayers.aPlayers[p].oPersonnage.move(oNewPosition);
                }else{
                    console.log('Colision',oNewPosition);
                    //to keep the timers, stay at the actual position
                    this.oListOfPlayers.aPlayers[p].oPersonnage.move(this.oListOfPlayers.aPlayers[p].oPersonnage.oPosition);
                }
                
                console.log('Position : ',this.oListOfPlayers.aPlayers[p].oPersonnage.oPosition);
                console.log('--------------------------------------');
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
            //this.animateConvoi();
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

//////////////////COLISIONS

this.verifyCollisionsPersonnage = function(oPersonnage,oNewPosition){
    
    //wtih the convoi
    oPositionOrigin = oPersonnage.oPosition;
    oPersonnage.oPosition = oNewPosition;
    bRes = Distance.testsCollisionElementCarre(this.oConvoi,oPersonnage);
    oPersonnage.oPosition = oPositionOrigin;
    return bRes;
}

//////////////////INIT
        
        this.init = function(sName){
            oConfigMap = require('./../../datas/maps/' + sName + '.json');
            this.oListOfPlayers = new ListOfPlayers();
            
            //Map
            this.sName = oConfigMap.sName;
            this.iWidth = oConfigMap.iWidth;
            this.iHeight = oConfigMap.iHeight;
            this.iMinPlayers = oConfigMap.iMinPlayers;
            this.iMaxPlayers = oConfigMap.iMaxPlayers;

            //Bases
            this.oBlueSideBase = new Base().init(oConfigMap.oBlueSideBase).setName('blue');                           
            this.oRedSideBase = new Base().init(oConfigMap.oRedSideBase).setName('red');
            
            //Convoi
            this.oConvoi = new Convoi().init(oConfigMap.sConvoi);
            this.oConvoi.setCoordXY(oConfigMap.oRoute.oOrigineConvoi.iX, oConfigMap.oRoute.oOrigineConvoi.iY)
            
            //Route
            this.oRoute =  oConfigMap.oRoute;
            
            this.oInfos = this.getPublicInfos();    
            return this;
        };
}
module.exports = Map;