function Distance() {

}

Distance.distance = function (x1, y1, x2, y2) {
    return  Math.sqrt(((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
};

Distance.distanceCoordonnees = function (CoordonneesA, CoordonneesB) {
    return  Math.sqrt(((CoordonneesB.iX - CoordonneesA.iX) * (CoordonneesB.iX - CoordonneesA.iX) + (CoordonneesB.iY - CoordonneesA.iY) * (CoordonneesB.iY - CoordonneesA.iY)));
};

Distance.calcAngle = function (oOrigine, oDestination)
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
};

Distance.calcDeplacement = function (iV, oOrigine, fAngle) {
    return {
        iX: oOrigine.iX + iV * Math.cos(fAngle),
        iY: oOrigine.iY + iV * Math.sin(fAngle)
    };
};

Distance.testsCollisionElementCarre = function(oElementA, oElementB){
    if((oElementB.oPosition.iX >= oElementA.oPosition.iX + oElementA.iWidth)      // trop à droite
	|| (oElementB.oPosition.iX + oElementB.iWidth <= oElementA.oPosition.iX) // trop à gauche
	|| (oElementB.oPosition.iY >= oElementA.oPosition.iY + oElementA.iHeight) // trop en bas
	|| (oElementB.oPosition.iY + oElementB.iHeight <= oElementA.oPosition.iY)){  // trop en haut
          return false;
    }else{
          return true;
    }
};

Distance.testsCollisionBetweenCarres = function(iX1,iY1,iW1,iH1,iX2,iY2,iW2,iH2)
{
   if((iX2 >= iX1 + iW1)      // trop à droite
	|| (iX2 + iW2 <= iX1) // trop à gauche
	|| (iY2 >= iY1 + iH1) // trop en bas
	|| (iY2 + iH2 <= iY1))  // trop en haut
          return false; 
   else
          return true; 
}

module.exports = Distance;