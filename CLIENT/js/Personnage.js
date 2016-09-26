function Personnage(oToile) {

    Element.call(this, oToile);


    this.init = function (oParamsPersonnage) {
        console.log('initPerso',oParamsPersonnage);
        this.setCoord(oParamsPersonnage.oPosition)
            .setDim(oParamsPersonnage.iWidth,oParamsPersonnage.iHeight)
            .setVitesse(oParamsPersonnage.fSpeed);
    
        
        if(oParamsPersonnage.sName == 'Azur'){
            this.setColor('#18A7D6');
        }else if(oParamsPersonnage.sName == 'Magenta'){
            this.setColor('#FF00FF');
        }
       
        return this;
    };
}