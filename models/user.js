module.exports = function(sequelize, DataTypes) {
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
        type: DataTypes.INT,
        allowNull: false
      },
      lastLogin: {
        type: DataTypes.DATETIME,
        allowNull: false
      },
    });
    user.associate = function(models) {
      user.hasMany(models.character, {
        onDelete: "cascade"
      });
    };
    return User;
  };
  