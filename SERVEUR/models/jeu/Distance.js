function Distance() {
    
    /**
     * 
     * @param {type} x1
     * @param {type} y1
     * @param {type} x2
     * @param {type} y2
     * @returns {Number}
     */
    this.distance = function(x1, y1, x2, y2) {
        return  Math.sqrt(((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
    }

    /**
     * 
     * @param {type} oOrigine
     * @param {type} oDestination
     * @returns {Number}
     */
    this.calcAngle = function(oOrigine, oDestination)
    {
        var x = oDestination.iX - oOrigine.iX;
        var y = oDestination.iY - oOrigine.iY;
        if (x == 0) {
            x = 0.01;
        }
        if (x < 0) {
            return (Math.atan(y / x) + Math.PI);
        } else {
            return (Math.atan(y / x));
        }
    }
    
    /**
     * 
     * @param {type} iV
     * @param {type} oOrigine
     * @param {type} fAngle
     * @returns {Distance.calcDeplacement.DistanceAnonym$0}
     */
    this.calcDeplacement = function(iV, oOrigine, fAngle) {
        return {
            iX: oOrigine.iX + iV * Math.cos(fAngle),
            iY: oOrigine.iY + iV * Math.sin(fAngle)
        };
    }

}
module.exports = Distance;