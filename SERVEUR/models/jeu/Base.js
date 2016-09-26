Element = require('./Element.js');
function Base() { 
    Element.call(this); // Héritage
    
       
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