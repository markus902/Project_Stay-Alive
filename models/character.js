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
  // character.associate = function (models) {
  //   character.belongsTo(models.user, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  //   character.belongsTo(models.inventory, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };
  return Character;
};
