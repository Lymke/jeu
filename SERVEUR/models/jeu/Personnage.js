Element = require('./Element.js');
function Personnage() {
    Element.call(this); // Héritage

    this.init = function (sName) {
        oConfigPersonnage = require('./../../datas/personnages/' + sName + '.json');
        this.sName = sName;
        this.iWidth = oConfigPersonnage.iWidth;
        this.iHeight = oConfigPersonnage.iHeight;
        this.fSpeed = oConfigPersonnage.fSpeed;
        return this;
    };
    
    this.getPublicInfos = function () {
        return {
            sName: this.sName,
            iWidth: this.iWidth,
            iHeight: this.iHeight,
            fSpeed: this.fSpeed,
            oPosition : this.oPosition,
            oDestination : this.oDestination,
            iAngle : this.iAngle,
            iStartMoveTimestamp : this.iStartMoveTimestamp,
            oStartMovePosition : this.oStartMovePosition
        };
    };
};
module.exports = Personnage;