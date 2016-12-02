function Element(oToile) {

    this.oToile = oToile;
    this.oPosition = {}; //type Coordinates
    this.oDestination = {
        iX: null,
        iY: null
    }; //type Coordinates
    this.iWidth;
    this.iHeight;
    this.sColor;
    this.fSpeed;
    this.iAngle;
    this.iStartMoveTimestamp;
    this.oStartMovePosition;
    this.iLastDistance = null;
    this.bStop = false;

    ///////////////// GETTER & SETTER

    this.setCoordXY = function (iX, iY) {
        this.oPosition.iX = iX;
        this.oPosition.iY = iY;
        return this;
    };

    this.setCoord = function (oCoordonnees) {
        this.oPosition = oCoordonnees;
        return this;
    };

    this.setDim = function (iWidth, iHeight) {
        this.iWidth = iWidth;
        this.iHeight = iHeight;
        return this;
    };

    this.setColor = function (sColor) {
        this.sColor = sColor;
        return this;
    };

    this.setVitesse = function (fSpeed) {
        this.fSpeed = fSpeed;
        return this;
    };

    ///////////////// FUNCTIONS

    this.draw = function () {
        this.oToile.drawCarre(this.oPosition.iX - (this.iWidth / 2), this.oPosition.iY - (this.iHeight / 2), this.iWidth, this.iHeight, this.sColor); //base 2
    };

    this.distanceElement = function (elmt2) {
        return distance(this.oPosition.iX, this.oPosition.iY, elmt2.oPosition.iX, elmt2.oPosition.iY);
    };

    this.distanceCoord = function (oCoordinates) {
        return distance(this.oPosition.iX, this.oPosition.iY, oCoordinates.iX, oCoordinates.iY);
    };

    /**
     * Indicate where you want to go in parameters (iX2, iY2)
     * Calc the angle from the actual coord.
     * Save this angle
     */
    this.moveTo = function (oDestination) {
        this.iLastDistance = null;
        this.oDestination = oDestination;
        this.iAngle = calcAngle(this.oPosition, this.oDestination);
        this.iStartMoveTimestamp = new Date().getTime();
        this.oStartMovePosition = this.oPosition;
    };

    this.moveToDatasElement = function (oDatasElement) {
        this.iLastDistance = null;
        this.oDestination = oDatasElement.oDestination;
        this.iAngle = oDatasElement.iAngle;
        this.iStartMoveTimestamp = oDatasElement.iStartMoveTimestamp;
        this.oStartMovePosition = oDatasElement.oStartMovePosition;
    };


    
    /**
     * Return the new position of the element after his move
     */
    this.calcPositionMove = function () {
            if (this.oDestination.iX == null) {
                //there is no destination or position setted, we return the actual position
                return this.oPosition;
            }
            
            //Calc the new theoric position
            iTpsFromStartMove = new Date().getTime() - this.iStartMoveTimestamp;
            oNewPosition = calcDeplacement((iTpsFromStartMove / 1000) * this.fSpeed, this.oStartMovePosition, this.iAngle);
            
            //if the distance between startMove and destination is greater than startPosition and theoric, that seems the element is arrived
            if(distanceCoordonnees(this.oStartMovePosition,oNewPosition) > distanceCoordonnees(this.oStartMovePosition,this.oDestination)){
                return this.oDestination;
            }else{
                return oNewPosition;
            }
    };

    /**
     * 
     * @param {type} oPosition
     * @returns {undefined}
     */
    this.move = function(oPosition){
        this.oPosition = oPosition;
        
        if(oPosition.iX == this.oDestination.iX  && oPosition.iY == this.oDestination.iY ){
            //the element is arived
            this.oDestination = { iX : null, iY : null};
        }
    };
}