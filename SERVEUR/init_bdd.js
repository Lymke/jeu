//Initialise the database with creation of tables defined in the models

var db = require('./models/db');
var sequelize = db.sequelize;
sequelize.sync({force: true}); // will emit success or failure