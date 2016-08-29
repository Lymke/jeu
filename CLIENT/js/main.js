(function () {
    
    var canvas = document.getElementById("mon_canvas");
    var ctx = canvas.getContext("2d");
    
    /**
     * Add the click event to the canvas object
     * @param {type} event
     * @returns {main_L1.relMouseCoords.mainAnonym$0}
     */
    function relMouseCoords(event) {
        var rect = canvas.getBoundingClientRect();
        return {
            iX : Math.floor((event.clientX-rect.left)/(rect.right-rect.left)*canvas.width), 
            iY : Math.round((event.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height)
        }
    }
    HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;
    
    
    var oToile = new Toile(canvas,ctx);
    var oCarte = new Carte(oToile).init();
    
    function clickCanvas(event) {
        coords = canvas.relMouseCoords(event);
        oCarte.click(coords);
    }
    canvas.addEventListener("click", clickCanvas);
    
    
    var bPause = 1;
    function play(){
        bPause = 0;
        animate();
    }
    function pause(){
        bPause = 1;
    }
    
    function animate()
    {   oCarte.animate();
        if(bPause == 0){
            setTimeout(animate, 1000 / 30);
        }
    }
     document.getElementById("btnNextFrame").addEventListener("click", animate);
     document.getElementById("btnPlay").addEventListener("click", play);
     document.getElementById("btnPause").addEventListener("click", pause);
    animate();
})();