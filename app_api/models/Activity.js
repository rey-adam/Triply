
module.exports = function (sequelize, DataTypes) {

    const Activity = sequelize.define("Activity", {
        name: DataTypes.STRING,
        eventId: DataTypes.INTEGER
    }); // END CONSTRUCTOR

    Activity.associate = function (models) {
        Activity.belongsTo(models.Location, {
            foreignKey: {
                allowNull: false
            }
        }); // END ACTIVITY JOIN LOCATION
    }; // END ASSOCIATION

    return Activity;

}; // END EXPORT 