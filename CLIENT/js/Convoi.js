function Convoi(oToile) {
    Element.call(this, oToile);
    
    this.iDistMinForMoveConvoi = 100;
    this.iDirection;// left = 0; right = 1


    this.init = function (oParams) {
        this.setCoord(oParams.oRoute.oOrigineConvoi)
            .setDim(oParams.oConvoi.iWidth, oParams.oConvoi.iHeight)
            .setVitesse(oParams.oConvoi.fSpeed)
            .setColor('#D1D479');//When there will be more type of convoi, adapt that
    
            return this;
    };
}