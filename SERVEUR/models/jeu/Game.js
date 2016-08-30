Player = require('./Player.js');
function Game() { 
	this.aPlayers = [];
	
	this.addPlayer = function(iIdSocket,sLogin){
		this.aPlayers[iIdSocket] = new Player(sLogin);
	};
	
	this.subPlayer = function(iIdSocket){
		if(iIdSocket in this.aPlayers){
			delete this.aPlayers[iIdSocket];
		}
	};
	
	/**
	 * Return Players without id
	 */
	this.getPlayersWithoutId = function(){
		data = [];
		for(p in this.aPlayers){
			data.push(this.aPlayers[p].sLogin);
		}
		return data;
	};
		
}
module.exports = Game;