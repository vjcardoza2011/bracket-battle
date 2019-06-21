module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    // associate users with brackets - if user is deleted, delete their brackets too
    User.associate = function (models) {
        User.hasMany(models.Bracket, {
            onDelete: "cascade"
        });
    };

    return User;
};
