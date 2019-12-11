module.exports = function (sequelize, DataTypes) {
  const CharacterPowerUps = sequelize.define("CharacterPowerUps", {
    PowerUpName: { type: DataTypes.STRING }
   },
    { freezeTableName: true });

  CharacterPowerUps.associate = function (models) {
    CharacterPowerUps.belongsTo(models.Character, {
      foreignKey: {
        allowNull: false
      }
    })
    CharacterPowerUps.belongsTo(models.PowerUp, {
      foreignKey: {
        allowNull: false
      }
    })
  }
  return CharacterPowerUps;
};
