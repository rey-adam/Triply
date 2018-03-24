
module.exports = function (sequelize, DataTypes) {

    const Location = sequelize.define("Location", {
        name: DataTypes.STRING,
        parkCode: DataTypes.STRING,
        latitude: DataTypes.FLOAT,
        longitude: DataTypes.FLOAT
    }); // END LOCATION CONSTRUCTOR

    Location.associate = function (models) {
        Location.belongsTo(models.Trip, {
            foreignKey: {
                allowNull: false
            }
        }); // END LOCATION JOIN TRIP
        Location.hasMany(models.Trail, {
            onDelete: 'cascade'
        }); // END LOCATION JOIN TRAIL
        Location.hasMany(models.Campsite, {
            onDelete: 'cascade'
        }); // END LOCATION JOIN CAMPSITE
        Location.hasMany(models.Activity, {
            onDelete: 'cascade' 
        }); // END LOCATION JOIN VISITOR CENTER
        Location.hasMany(models.VisitorCenter, {
            onDelete: 'cascade' 
        }); // END LOCATION JOIN VISITOR CENTER
    }; // END ASSOCIATION

    return Location;

}; // END EXPORT 