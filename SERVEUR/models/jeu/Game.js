Player = require('./Player.js');
Map = require('./Map.js');
function Game() {
    this.aPlayers = [];
    this.iMaxPlayers = 2;

    this.oMap;

    this.addPlayer = function (iIdSocket, sLogin) {
        this.aPlayers[iIdSocket] = new Player(sLogin);
    };

    this.subPlayer = function (iIdSocket) {
        if (iIdSocket in this.aPlayers) {
            delete this.aPlayers[iIdSocket];
        }
    };

    /**
     * Return Players without id
     */
    this.getPlayersWithoutId = function () {
        data = [];
        for (p in this.aPlayers) {
            data.push(this.aPlayers[p].sLogin);
        }
        return data;
    };

    /**
     * 
     * @returns {undefined}
     */
    this.dividePlayers = function () {
        for (p in this.aPlayers) {
            if (count(this.oMap.aPlayersBlueSide) < this.iMaxPlayers / 2) {
                this.oMap.addPlayerBueSide(this.aPlayers[p]);
            } else {
                this.oMap.addPlayerRedSide(this.aPlayers[p]);
            }
        }
    };


    /**
     * 
     * @returns {undefined}
     */
    this.isReady = function () {
        return (count(this.aPlayers) == this.iMaxPlayers);
    };

    this.start = function () {
        this.oMap = new Map();
        this.dividePlayers();
        this.oMap.init();
    }

}
module.exports = Game;