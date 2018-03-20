
module.exports = function (sequelize, DataTypes) {

    const VisitorCenter = sequelize.define("VisitorCenter", {
        name: DataTypes.STRING,
        centerId: DataTypes.INTEGER
    }); // END CONSTRUCTOR

    VisitorCenter.associate = function (models) {
        VisitorCenter.belongsTo(models.Location, {
            foreignKey: {
                allowNull: false
            }
        }); // END VISITOR CENTER JOIN LOCATION
    }; // END ASSOCIATION

    return VisitorCenter;

}; // END EXPORT 