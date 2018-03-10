
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
    }; // END ASSOCIATION

    // JOINING TRIP TO LOCATION
    Location.associate = function (models) {
        Location.hasMany(models.Trail, {
            onDelete: "cascade"
        }); // END LOCATION JOIN TRAIL
    }; // END ASSOCIATION

    return Location;

}; // END EXPORT 