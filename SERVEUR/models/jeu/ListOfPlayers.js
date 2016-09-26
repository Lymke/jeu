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
            for (p in this.aPlayers) {
                if(this.aPlayers[p].iIdSocket == iIdSocket){
                    iId = this.aPlayers[p].iId;
                    this.aPlayers.splice(p,1);
                    return iId;
                }
            }
        };
};
module.exports = ListOfPlayers;