
module.exports = function (sequelize, DataTypes) {

    const Eatery = sequelize.define("Eatery", {
        name: DataTypes.STRING
    }); // END CONSTRUCTOR

    Eatery.associate = function (models) {
        Eatery.belongsTo(models.Location, {
            foreignKey: {
                allowNull: false
            }
        }); // END EATERY JOIN LOCATION
    }; // END ASSOCIATION

    return Eatery;

}; // END EXPORT 