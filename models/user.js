module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // character_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    lastLogin: {
      type: DataTypes.INTEGER,
      allowNull: true
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
