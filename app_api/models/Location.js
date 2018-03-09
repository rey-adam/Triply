
module.exports = function (sequelize, DataTypes) {

    const Location = sequelize.define("Location", {
        name: DataTypes.STRING
    }); // END LOCATION CONSTRUCTOR

    Location.associate = function (models) {
        Location.belongsTo(models.Trip, {
            foreignKey: {
                allowNull: false
            }
        }); // END LOCATION JOIN TRIP
    }; // END LOCATION ASSOCIATION

    return Location;

}; // END EXPORT 