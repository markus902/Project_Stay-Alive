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
  });
  PowerUp.associate = function(models) {
    PowerUp.hasMany(models.Character, {
      onDelete: "cascade"
    });
  };
  return PowerUp;
};
