function ListOfPlayers(sLogin) { 
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
        
        this.subPlayer = function(iIdSocket){
            console.log('List sub ' + iIdSocket);
            for (p in this.aPlayers) {
                if(this.aPlayers[p].iIdSocket == iIdSocket){
                    this.aPlayers.splice(p,1) 
                }
            }
        };
};
module.exports = ListOfPlayers;