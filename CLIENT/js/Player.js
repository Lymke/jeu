function Player() { 
	this.iId;
	this.sLogin;
        this.iSide;
        this.oPersonnage = {};
        
        this.init = function(oParams){
            this.iId = oParams.iId;
            this.sLogin = oParams.sLogin;
            return this;
        };
        
        this.setPersonnage = function(oPersonnage){
            this.oPersonnage = oPersonnage;
            return this;
        };
        
}
