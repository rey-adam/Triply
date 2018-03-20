
module.exports = function (sequelize, DataTypes) {

    const Campsite = sequelize.define("Campsite", {
        name: DataTypes.STRING,
        campId: DataTypes.INTEGER
    }); // END CONSTRUCTOR

    Campsite.associate = function (models) {
        Campsite.belongsTo(models.Location, {
            foreignKey: {
                allowNull: false
            }
        }); // END CAMPSITE JOIN LOCATION
    }; // END ASSOCIATION

    return Campsite;

}; // END EXPORT 