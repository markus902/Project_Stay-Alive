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
  });

  User.sync().then(() => {
    User.create({
      userName: 'markus902',
      password: "test password",
      email: "test@testmail.com",
      firstName: "Markus",
      lastName: "Kühn",
      characterID: "0",
      lastLogin: "0",
    });
  });

  User.sync().then(() => {
    User.create({
      userName: 'Jeremias',
      password: "appleJunky",
      email: "test@mailer.net",
      firstName: "Jeremy",
      lastName: "Muniak",
      characterID: "2",
      lastLogin: "5",
    });
  });

  User.associate = function (models) {
    User.hasMany(models.Character, {
      onDelete: "cascade"
    });
  };
  return User;
};
