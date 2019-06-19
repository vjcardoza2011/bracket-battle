module.exports = function (sequelize, DataTypes) {
    var Bracket = sequelize.define("User", {
        bracket_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    return Bracket;
};
