class Element{
constructor(toile){
    
    this.oToile = toile;
    this.oPosition = {};//type Coordinates
    this.oDestination = {iX : null, iY : null};//type Coordinates
    this.iWidth;
    this.iHeight;
    this.sColor;
    this.fVitesse;
    this.iAngle;
    this.iLastDistance = null;
    
    ///////////////// GETTER & SETTER
    
    this.setCoord = function(iX, iY){
        this.oPosition.iX = iX;
        this.oPosition.iY = iY;
        return this;
    };

    this.setDim = function(iWidth, iHeight){
        this.iWidth = iWidth;
        this.iHeight = iHeight;
         return this;
    };

    this.setColor = function(sColor){
        this.sColor = sColor;
        return this;
    };

     this.setVitesse = function(fVitesse){
        this.fVitesse = fVitesse;
        return this;
    };

    ///////////////// FUNCTIONS

    this.draw = function(){      
        this.oToile.drawCarre(this.oPosition.iX,this.oPosition.iY, this.iWidth, this.iHeight, this.sColor); //base 2
    };

    this.distanceElement = function(elmt2){
        return distance(this.oPosition.iX, this.oPosition.iY, elmt2.oPosition.iX, elmt2.oPosition.iY);
    };

    this.distanceCoord = function(oCoordinates){
        return distance(this.oPosition.iX, this.oPosition.iY, oCoordinates.iX, oCoordinates.iY);
    };
    
    /**
     * Indicate where you want to go in parameters (iX2, iY2)
     * Calc the angle from the actual coord.
     * Save this angle
     */
    this.moveTo = function(oDestination){
        this.iLastDistance = null;
        this.oDestination = oDestination;
        this.iAngle = calcAngle( this.oPosition, this.oDestination);
    };
    
    /**
     * Set the new position of the element
     */
    this.move = function(){
        
        if(this.oDestination.iX == null){
            //there is no destination or position setted, we return this
            return this;
        }
        
        var iDistance = this.distanceCoord(this.oDestination);
        if (this.iLastDistance != null && iDistance > this.iLastDistance){
            //The element is arived at destination
            this.iLastDistance = null;
            this.oPosition = this.oDestination;
            console.log(this.oPosition);
            this.oDestination = { iX : null, iY : null};
        } else{
            //Calc the new position of the element
            this.iLastDistance = iDistance;
            this.oPosition = calcDeplacement(this.fVitesse, this.oPosition,this.iAngle);
       }
       
       return this;
    };
}
}