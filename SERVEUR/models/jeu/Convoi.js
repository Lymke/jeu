Element = require('./Element.js');
function Convoi(){
    Element.call(this); // Héritage
    this.iDirection;// left = 0; right = 1
    
}
module.exports = Convoi;
