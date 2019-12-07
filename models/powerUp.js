module.exports = function (sequelize, DataTypes) {
  const PowerUp = sequelize.define("PowerUp", {
    PowerUpName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PowerUpType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: ["HealthRecovery", "ExperienceBoost"]
      }
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageSrc: {
      type: DataTypes.STRING,
      allowNull: false
    },

  },
    { freezeTableName: true });
  return PowerUp;
};
