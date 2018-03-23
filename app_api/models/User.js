
module.exports = function (sequelize, DataTypes) {

    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            unique: true,
            require: true,
            validate: {
                isEmail: true
            }
        },
        salt: DataTypes.STRING,
        hash: DataTypes.STRING(1500)
    }); // END CONSTRUCTOR

    User.associate = function (models) {
        User.hasMany(models.Trip, {
            onDelete: 'cascade'
        }); // END JOIN 
    }; // END ASSOCIATION

    return User;

}; // END EXPORT