Distance = require('./Distance.js');
function Element() {
    this.sName;
    this.oPosition = {};//type Coordinates
    this.oDestination = {iX: null, iY: null};//type Coordinates
    this.iWidth;
    this.iHeight;
    this.sColor;
    this.fSpeed;
    this.iAngle;
    this.iLastDistance = null;
    this.bStop = false;
    
    ///////////////// GETTER & SETTER

    this.setCoord = function (oCoord) {
        this.oPosition = oCoord;
        return this;
    };
    this.setCoordXY = function (iX, iY) {
        this.oPosition.iX = iX;
        this.oPosition.iY = iY;
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

    this.setName = function (sName) {
        this.sName = sName;
        return this;
    };

    ///////////////// FUNCTIONS


    this.distanceElement = function (elmt2) {
        return Distance.distance(this.oPosition.iX, this.oPosition.iY, elmt2.oPosition.iX, elmt2.oPosition.iY);
    };

    this.distanceCoord = function (oCoordinates) {
        return Distance.distance(this.oPosition.iX, this.oPosition.iY, oCoordinates.iX, oCoordinates.iY);
    };

    /**
     * Indicate where you want to go in parameters (iX2, iY2)
     * Calc the angle from the actual coord.
     * Save this angle
     */
    this.moveTo = function(oDestination){
        this.iLastDistance = null;
        this.oDestination = oDestination;
        this.iAngle = Distance.calcAngle( this.oPosition, this.oDestination);
        this.iTimestamp = new Date().getTime();
        this.iTimestampStartMove = new Date().getTime();
        return this;
        
    };

    /**
     * Set the new position of the element
     */
    this.move = function () {
        if(!this.bStop){
            if (this.oDestination.iX == null) {
                //there is no destination or position setted, we return this
                return this;
            }

            var iDistance = this.distanceCoord(this.oDestination);
            if (this.iLastDistance != null && iDistance > this.iLastDistance) {
                //The element is arived at destination
                this.iLastDistance = null;
                this.oPosition = this.oDestination;
                this.oDestination = {iX: null, iY: null};

            } else {
                //Calc the new position of the element
                this.iLastDistance = iDistance;
                iNow = new Date().getTime();
                iTpsFromLastCall = iNow - this.iTimestamp;
                this.oPosition = Distance.calcDeplacement((iTpsFromLastCall / 1000) * this.fSpeed, this.oPosition, this.iAngle);
                this.iTimestamp = iNow;
            }
        }
        return this;
    };

    this.stop = function(bStop){
        this.bStop = bStop;
        return this;
    };

    this.getInfos = function () {
        return {
            sName: this.sName,
            oPosition: this.oPosition,
            oDestination: this.oDestination,
            iWidth: this.iWidth,
            iHeight: this.iHeight,
            sColor: this.sColor,
            fSpeed: this.fSpeed,
            iAngle: this.iAngle
        };
    };
}
module.exports = Element;