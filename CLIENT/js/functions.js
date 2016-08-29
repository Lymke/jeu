function distance(x1, y1, x2, y2) {
    return  Math.sqrt(((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
}

function calcAngle( oOrigine, oDestination)
{   var x = oDestination.iX - oOrigine.iX;
    var y = oDestination.iY - oOrigine.iY;
    if (x == 0) {
        x = 0.01;
    }
    if (x < 0) {
        return (Math.atan(y / x) + Math.PI);
    } else {
        return (Math.atan(y / x));
    }
}

function calcDeplacement(iV, oOrigine, fAngle) {
    return {
        iX: oOrigine.iX + iV * Math.cos(fAngle),
        iY: oOrigine.iY + iV * Math.sin(fAngle)
    };
}