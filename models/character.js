module.exports = function (sequelize, DataTypes) {
  const Character = sequelize.define("Character", {
    characterID:
    {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    characterName:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    health: {
      type: DataTypes.INTEGER,
      default: 100,
      valdiate: {
        min: 0
      }
    },
    experience: {
      type: DataTypes.INTEGER,
      default: 0,
      validiate: {
        min: 0
      }
    },
    inventory: {
      type: DataTypes.JSON,
      allowNull: true
    }
  });
  Character.associate = function (models) {
    Character.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Character.belongsTo(models.PowerUp, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Character;
};
