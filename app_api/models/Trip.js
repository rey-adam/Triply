
module.exports = function (sequelize, DataTypes) {

    const Trip = sequelize.define("Trip", {
        name: DataTypes.STRING
    }); // END TRIP CONSTRUCTOR

    Trip.associate = function (models) {
        Trip.hasMany(models.Location, {
            onDelete: 'cascade'
        }); // END TRIP JOIN LOCATION 
    }; // END TRIP ASSOCIATION

    Trip.associate = function (models) {
        Trip.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        }); // END TRIP JOIN USER
    }; // END ASSOCIATION

    return Trip;
}; // END EXPORT 