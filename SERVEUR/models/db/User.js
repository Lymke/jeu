bcrypt = require('bcrypt-nodejs');//To scrypt the password

/**
 * Table User, save users
 * @param Sequelize sequelize
 * @param DataTypes DataTypes
 * @returns {unresolved}
 */
module.exports = function (sequelize, DataTypes) {
	
	return sequelize.define('User', 
	{
	  login : DataTypes.STRING,
          password:       
          {
                type: DataTypes.STRING,
                set:  function(v) 
                {
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(v, salt);

                    this.setDataValue('password', hash);
                }
          },
	  firstname: DataTypes.STRING,
	  lastname: DataTypes.STRING,
	  email : DataTypes.STRING
	},
	{
	  getterMethods   : 
	  {
                /**
                 * Concat firstname and lastname to make fullname
                 * @returns String
                 */
		fullname       : function()  { return this.firstname + ' ' + this.lastname; }
  	  },
	  setterrMethods   : 
	  {
  	  },
          instanceMethods: 
          {     
                /**
                 * Compare password with user's password
                 * @param String password
                 * @returns boolean
                 */
                verifyPassword: function(password) 
                {
                    return bcrypt.compareSync(password, this.password);
               }
          }
	
	});
	
};