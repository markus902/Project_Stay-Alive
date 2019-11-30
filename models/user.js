module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // character_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    lastLogin: {
      type: DataTypes.INTEGER,
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
