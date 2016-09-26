function Base(oToile) {

    Element.call(this, oToile); // Héritage
      
    this.init = function(oParamBase){
       
        this.setCoord(oParamBase.oPosition)
            .setDim(oParamBase.iWidth,oParamBase.iHeight);
    
        if(oParamBase.sName == 'blue'){
            this.setColor('#0000FF');
        }else{
            this.setColor('#FF0000');
        }
        return this;
            
   };

}