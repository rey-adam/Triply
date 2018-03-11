
module.exports = function (sequelize, DataTypes) {

    const Trip = sequelize.define("Trip", {
        name: DataTypes.STRING
    }); // END TRIP CONSTRUCTOR

    Trip.associate = function (models) {
        Trip.hasMany(models.Location, {
            onDelete: "cascade"
        }); // END TRIP JOIN LOCATION 
    }; // END TRIP ASSOCIATION

    return Trip;
}; // END EXPORT 