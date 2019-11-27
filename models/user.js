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
    characterID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lastLogin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    acessToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fitBitUserID: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });


  User.associate = function (models) {
    User.hasMany(models.Character, {
      onDelete: "cascade"
    });
  };
  return User;
};
