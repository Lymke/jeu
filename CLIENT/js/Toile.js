class Toile{
    constructor(canvas,context){
    this.canvas = canvas;
    this.context = context;
    
    ///////////// FUNCTIONS 
    
    this.drawCarre = function(x, y, width, height, color){
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    };
    
    this.clear = function(){
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }
            
            
    }
};
