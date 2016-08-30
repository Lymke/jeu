var Sequelize = require('sequelize');
var colors      = require('colors');
config = require('../../config/config');
if(config.db.active == false){
	return false;
}
//Init Sequelize, connection to database

    var sequelize = new Sequelize(config.db.database,
                                  config.db.username, 
                                  config.db.password, 
                                  config.db.options);
    console.log('Connection to database : OK');


// Models to load

    var models = [
                    'User',
                    'RelationContact'
                 ];

    //Contacts is table User so I add it manually
    module.exports['Contact'] = sequelize.import(__dirname + '/User');

    models.forEach(function(model) 
    {
            module.exports[model] = sequelize.import(__dirname + '/' + model);
    });


// Describe relationships

    (function(m) 
    {
        m.User.hasMany(m.Contact, { as: 'Contacts',through: m.RelationContact });
        m.Contact.belongsToMany(m.User, { as: 'Contacts',through: m.RelationContact });
        
    })(module.exports);


//Export sequelize

    module.exports.sequelize = sequelize;