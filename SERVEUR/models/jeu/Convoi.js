Element = require('./Element.js');
function Convoi() {
    Element.call(this); // Héritage

    this.iDistanceMove;
    this.iDirection;
    this.sName = 'convoi';
    this.setDistanceMove = function (iDistanceMove) {
        this.iDistanceMove = iDistanceMove;
        return this;
    };

    this.isNear = function (oElement) {
        return this.distanceElement(oElement) <= this.iDistanceMove;
    };

    this.init = function (sName) {
        oConfigConvoi = require('./../../datas/convois/' + sName + '.json');
        return this.setName(sName)
            .setDim(oConfigConvoi.iWidth, oConfigConvoi.iHeight)
            .setVitesse(oConfigConvoi.fSpeed)
            .setDistanceMove(oConfigConvoi.fDistanceMove);
    }

    this.getPublicInfos = function () {
        return {
            iWidth: this.iWidth,
            iHeight: this.iHeight,
            fSpeed: this.fSpeed,
            iDirection: this.iDirection,
            iAngle: this.iAngle,
            oPosition: this.oPosition,
            oDestination: this.oDestination,
            iTimestamp: this.iTimestamp
        };
    };
}
module.exports = Convoi;