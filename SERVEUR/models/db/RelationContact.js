/**
 * Table User, save users
 * @param Sequelize sequelize
 * @param DataTypes DataTypes
 * @returns {unresolved}
 */
module.exports = function (sequelize, DataTypes) {
	
	return sequelize.define('RelationContact', {
            accepted: DataTypes.INTEGER
        });
	
};