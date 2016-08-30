class Carte{
constructor(oToile){
    
    this.oToile = oToile;
    this.oMyPersonnage;
    this.oConvoi;
    this.oBase1;
    this.oBase2;
    this.iDistMinForMoveConvoi = 100;
    
    this.oRoute = {
        oStart : {iX : 100, iY : 250},
        oEnd : {iX : 900, iY : 250},
        aCoordinates : [],
        oOrigineConvoi : {iX : 475, iY : 240}
        
    };//Route is an array of coordinates
    
    this.sColorRoute = "#333";

    ///////////////// GETTER & SETTER
    
    this.setRoute = function(aRoute){
        this.aRoute = aRoute;
    };
    
    ///////////////// FUNCTIONS
    this.drawCadre = function(){
        this.oToile.context.beginPath();
        this.oToile.context.lineWidth= 6;
        this.oToile.context.strokeStyle="#000";
        this.oToile.context.rect(3,3,this.oToile.canvas.width - 6,this.oToile.canvas.height-6);//this.oToile.canvas.width,this.oToile.canvas.hight); 
        this.oToile.context.stroke();
        return this;
    };
    
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
    };
        
    this.init = function(){
        
        this.oConvoi = new Convoi(this.oToile).setCoord(this.oRoute.oOrigineConvoi.iX, this.oRoute.oOrigineConvoi.iY)
                                           .setDim(50, 20)
                                           .setColor("#D1D479")
                                           .setVitesse(1);
                                   
        this.oBase1 = new Element(this.oToile).setCoord(0, 200).setDim(50, 100).setVitesse(100).setColor("olivedrab");                           
        this.oBase2 = new Element(this.oToile).setCoord(950, 200).setDim(50, 100).setVitesse(100).setColor("#FF0000");
        this.oMyPersonnage = new Personnage(this.oToile).setCoord(75, 220).setDim(10, 10).setVitesse(6).setColor("#00A8E0");
        return this;
    };
    
    
    this.moveConvoi = function(){
        if (this.oConvoi.distanceElement(this.oMyPersonnage) < this.iDistMinForMoveConvoi) {
            if (this.oConvoi.iDirection == 1) {
                if (this.oConvoi.oPosition.iX < 850) {
                    this.oConvoi.oPosition.iX += this.oConvoi.fVitesse;
                } else {
                    this.oConvoi.iDirection = 0;
                }

            } else {

                if (this.oConvoi.oPosition.iX > 100) {
                    this.oConvoi.oPosition.iX -= this.oConvoi.fVitesse;
                } else {
                    this.oConvoi.iDirection  = 1;
                }
            }
        }
        return this.oConvoi;
    };
    
    this.click = function(coords){
        this.oMyPersonnage.moveTo(coords);
    }
    
    this.animate = function(){
        this.oToile.clear();
        this.drawCadre().drawRoute();
        this.oConvoi.draw();
        this.oBase1.draw();
        this.oBase2.draw();
        this.oMyPersonnage.move().draw();
        this.moveConvoi().draw();
    }
}
}