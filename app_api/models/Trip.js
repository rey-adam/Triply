
module.exports = function (sequelize, DataTypes) {

    const Trip = sequelize.define("Trip", {
        name: DataTypes.STRING,
        start: DataTypes.INTEGER,
        end: DataTypes.INTEGER
    }); // END TRIP CONSTRUCTOR

    Trip.associate = function (models) {
        Trip.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        }); // END JOIN 
    }; // END ASSOCIATION

    Trip.associate = function (models) {
        Trip.hasMany(models.Location, {
            onDelete: 'cascade'
        }); // END JOIN 
    }; // END ASSOCIATION

    return Trip;
}; // END EXPORT 