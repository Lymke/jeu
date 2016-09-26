function Element(oToile){
    
    this.oToile = oToile;
    this.oPosition = {};//type Coordinates
    this.oDestination = {iX : null, iY : null};//type Coordinates
    this.iWidth;
    this.iHeight;
    this.sColor;
    this.fSpeed;
    this.iAngle;
    this.iLastDistance = null;
    
    ///////////////// GETTER & SETTER
    
    this.setCoordXY = function(iX, iY){
        this.oPosition.iX = iX;
        this.oPosition.iY = iY;
        return this;
    };
    
    this.setCoord = function(oCoordonnees){
        this.oPosition = oCoordonnees;
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

     this.setVitesse = function(fSpeed){
        this.fSpeed = fSpeed;
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
        this.iTimestamp = new Date().getTime();
        this.iTimestampStartMove = new Date().getTime();
        
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
            this.oDestination = { iX : null, iY : null};
            console.log('Temps', new Date().getTime() - this.iTimestampStartMove);

        } else{
            //Calc the new position of the element
            this.iLastDistance = iDistance;
            iNow = new Date().getTime();
            iTpsFromLastCall = iNow - this.iTimestamp;
            this.oPosition = calcDeplacement((iTpsFromLastCall/1000) * this.fSpeed, this.oPosition,this.iAngle);
            this.iTimestamp = iNow;
       }
       
       return this;
    };
}