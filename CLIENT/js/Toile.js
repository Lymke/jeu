function Toile(canvas,context){
    
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
    
    this.drawCadre = function(){
        this.context.beginPath();
        this.context.lineWidth= 6;
        this.context.strokeStyle="#000";
        this.context.rect(3,3,this.canvas.width - 6,this.canvas.height-6);//this.oToile.canvas.width,this.oToile.canvas.hight); 
        this.context.stroke();
        return this;
    };     
            
};
