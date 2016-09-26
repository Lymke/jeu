function Player(sLogin) { 
	this.sLogin = sLogin;
	this.iId;//Id public
	this.iIdSocket;//Id secret
	this.iSide;
        this.oPersonnage = {};
        
        /**
         * Return all infos about the player without idSockets and function, just the public datas
         * @returns {undefined}
         */
        this.getPublicInfos = function(){
            return {
                sLogin : this.sLogin,
                iId : this.iId,
                oPersonnage : this.oPersonnage.getPublicInfos()
            };
        };
	
}
module.exports = Player;