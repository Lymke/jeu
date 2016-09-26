Element = require('./Element.js');
function Convoi() { 
    Element.call(this); // Héritage
    
    this.getPublicInfos = function(){
        return {
            iWidth : this.iWidth,
            iHeight : this.iHeight,
            fSpeed : this.fSpeed 
      }; 
    };
}
module.exports = Convoi;