module.exports = function (sequelize, DataTypes) {
  const PowerUp = sequelize.define("PowerUp", {
    PowerUpName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PowerUpType: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isIn: ["HealthRecovery", "ExperienceBoost"]
      // }
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageSrc: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    { freezeTableName: true });

  // PowerUp.associate = function (models) {
  //   PowerUp.belongsToMany('Character', { through: 'CharacterPowerUps' });
  // }
  PowerUp.associate = function (models) {
  PowerUp.hasMany(models.CharacterPowerUps);
}
  return PowerUp;
};
