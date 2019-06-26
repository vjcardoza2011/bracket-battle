module.exports = function(sequelize, DataTypes) {
  var Bracket = sequelize.define("Bracket", {
    bracket_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    teamNames: {
      type: DataTypes.JSON,
      allowNull: false
    }
    // results: {
    //   type: DataTypes.JSON,
    //   allowNull: false
    // }
  });

  // brackets belong to a user; can't be created without a user - needs foreign key
  Bracket.associate = function(models) {
    Bracket.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Bracket;
};
