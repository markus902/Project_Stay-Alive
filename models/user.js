module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: false
    },
  },
    { freezeTableName: true });


  User.associate = function (models) {
    User.belongsTo(models.Character, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return User;
};
