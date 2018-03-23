
module.exports = function (sequelize, DataTypes) {

    const Trail = sequelize.define("Trail", {
        name: DataTypes.STRING,
        hikeId: DataTypes.INTEGER
    }); // END CONSTRUCTOR

    Trail.associate = function(models) {
        Trail.belongsTo(models.Location, {
            foreignKey: {
                allowNull: false
            }
        }); // END TRAIL JOIN LOCATION
    }; // END ASSOCIATION

    return Trail;

}; // END EXPORT 