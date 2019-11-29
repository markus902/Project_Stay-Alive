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
    }
  },
    { freezeTableName: true });


  PowerUp.associate = function (models) {
    PowerUp.belongsTo(models.Character, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return PowerUp;
};
