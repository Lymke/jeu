Player = require('./Player.js');
ListOfPlayers = require('./ListOfPlayers.js');
Map = require('./Map.js');
function Game() {
    this.oListPlayers = new ListOfPlayers();
    this.iMaxPlayers = 2;

    this.oMap;

    this.addPlayer = function (iIdSocket, sLogin) {
        var oPlayer = new Player(sLogin);
        oPlayer.iIdSocket = iIdSocket;
        this.oListPlayers.addPlayer(oPlayer);
        console.log('Game.addPLayer',this.oListPlayers);
    };

    this.subPlayer = function (iIdSocket) {
        this.oListPlayers.subPlayer(iIdSocket);
        console.log('Game.subPLayer',this.oListPlayers);
    };

    /**
     * Return Players without id
     */
    this.getPlayersWithoutId = function () {
        data = [];
        for (p in this.oListPlayers) {
            data.push(this.oListPlayers[p].sLogin);
        }
        return data;
    };

    /**
     * 
     * @returns {undefined}
     */
    this.dividePlayers = function () {
        for (p in this.oListPlayers.aPlayers) {
            if (this.oMap.oListPlayersBlueSide.count() < this.iMaxPlayers / 2) {
                this.oMap.addPlayerBueSide(this.oListPlayers.aPlayers[p]);
            } else {
                this.oMap.addPlayerRedSide(this.oListPlayers.aPlayers[p]);
            }
        }
    };


    /**
     * 
     * @returns {undefined}
     */
    this.isReady = function () {
        console.log("Nombre de joueurs : " + this.oListPlayers.count() + " ; max " + this.iMaxPlayers);
        return (this.oListPlayers.count() == this.iMaxPlayers);
    };

    this.start = function () {
        this.oMap = new Map();
        this.dividePlayers();
        this.oMap.init();
    };

}
module.exports = Game;