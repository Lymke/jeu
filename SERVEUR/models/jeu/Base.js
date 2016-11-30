Element = require('./Element.js');
function Base() { 
    Element.call(this); // Héritage
    
    this.init = function(oBaseConfig){
        
        return this.setCoordXY(oBaseConfig.iX, oBaseConfig.iY)
                   .setDim(oBaseConfig.iWidth, oBaseConfig.iHeight);
    };   
    this.getPublicInfos = function(){
        return {
            sName : this.sName,
            iWidth : this.iWidth,
            iHeight : this.iHeight,
            oPosition : this.oPosition
      }; 
    };
    
}
module.exports = Base;