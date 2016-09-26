function ListOfPlayers() { 
	this.aPlayers = [];
        
        /**
         * 
         * @returns {ListOfPlayers.aPlayers.length}
         */
	this.count = function(){
            return this.aPlayers.length;
        };
        
        /**
         * 
         * @param {type} oPlayer
         * @returns {undefined}
         */
        this.addPlayer = function(oPlayer){
            this.aPlayers.push(oPlayer);
        };
        
        this.subPlayer = function(iIdPlayer){
            for (p in this.aPlayers) {
                if(this.aPlayers[p].iId == iIdPlayer){
                    this.aPlayers.splice(p,1) 
                }
            }
        };
};