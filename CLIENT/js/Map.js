function Map(oToile){

    this.oToile = oToile;
    this.iFps;
    this.oMe;
    this.oListOfPlayers= new ListOfPlayers();
    this.oBaseBlueSide;
    this.oBaseRedSide;
    this.oConvoi;

    this.setFps = function(iFps){
        this.iFps = iFps;
        return this;
    };


//////////////////////////////// DRAW
     /**
     * 
     * @returns {Map}
     */
    this.drawCadre = function(){
        this.oToile.context.beginPath();
        this.oToile.context.lineWidth= 6;
        this.oToile.context.strokeStyle="#000";
        this.oToile.context.rect(3,3,this.oToile.canvas.width - 6,this.oToile.canvas.height-6);//this.oToile.canvas.width,this.oToile.canvas.hight); 
        this.oToile.context.stroke();
        return this;
    };
    
     /**
     * 
     * @returns {Map}
     */
    this.drawRoute = function(){
        this.oToile.context.beginPath(); // Debut du chemin
        this.oToile.context.lineWidth= 1;
        this.oToile.context.moveTo(this.oRoute.oStart.iX, this.oRoute.oStart.iY); // Le trace part du point 150,80
        
        for (key in this.oRoute.aCoordinates) {
            this.oToile.context.lineTo(oRoute.aCoordinates[key].iX,oRoute.aCoordinates[key].iY);
        }
        
        this.oToile.context.lineTo(this.oRoute.oEnd.iX, this.oRoute.oEnd.iY); // Un segment est ajoute vers 300,230
        this.oToile.context.closePath(); // Fermeture du chemin
        this.oToile.context.strokeStyle = this.sColorRoute; // Definition de la couleur de remplissage
        this.oToile.context.stroke();
        return this;
    };
    
    this.drawPlayers = function(){
        for(p in this.oListOfPlayers.aPlayers){
            this.oListOfPlayers.aPlayers[p].oPersonnage.draw();
        }
        
        this.oMe.oPersonnage.draw();
        return this;  
    };

    this.draw = function(){
       this.oToile.clear();
       this.drawCadre();
       this.drawRoute();
       this.oBlueSideBase.draw();
       this.oRedSideBase.draw();
       this.oConvoi.draw();
       this.drawPlayers();
    };
    
    
//////////////////////////////// ANIMATE (move, click...)   
    
    this.animatePlayers = function(){
        for(p in this.oListOfPlayers.aPlayers){
            this.oListOfPlayers.aPlayers[p].oPersonnage.move();
        }
        //this.oMe.oPersonnage.move(this.iFps);
        this.oMe.oPersonnage.move();
    };
    
    this.animate = function(){
        this.animatePlayers();
        this.draw();
    };
    
    this.click = function(oCoords){
        this.oMe.oPersonnage.moveTo(oCoords);
    };
    
    this.playerMove = function(oDatasPlayer){
        for(p in this.oListOfPlayers.aPlayers){
            if( this.oListOfPlayers.aPlayers[p].iId == oDatasPlayer.iId){
                this.oListOfPlayers.aPlayers[p].oPersonnage.moveTo(oDatasPlayer.oCoords);
            };
        }
    };
    
    this.initPlayers = function(oDatas){
        
        //Me
        this.oMe = new Player().init(oDatas.oMe);
        this.oMe.setPersonnage(new Personnage(oToile).init(oDatas.oMe.oPersonnage));
        
        //Players in the game
        for (p in oDatas.aPlayers) {
            if(oDatas.aPlayers[p].iId != this.oMe.iId){
                oPlayer = new Player().init(oDatas.aPlayers[p]);
                oPlayer.setPersonnage(new Personnage(oToile).init(oDatas.aPlayers[p].oPersonnage));
                this.oListOfPlayers.addPlayer(oPlayer);
            }
        }

        return this;
    };
    
    this.init = function(oParams){
        
        //Route & convoi
        this.oRoute = oParams.oRoute;
        this.oConvoi = new Convoi(this.oToile).init(oParams);
 
        //BlueSide
        this.oBlueSideBase = new Base(this.oToile).init(oParams.oBlueSideBase);
        this.oRedSideBase = new Base(this.oToile).init(oParams.oRedSideBase);
        
        //Players
        this.initPlayers(oParams);

        return this;
    };
}
