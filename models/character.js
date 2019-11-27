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
    },
    bodyType: {
      type: DataTypes.INTEGER,
      default: 0,
      validiate: {
        min: 0,
        max: 4
      }
    },
    hairType: {
      hairType: DataTypes.INTEGER,
      default: 0,
      validiate: {
        min: 0,
        max: 4
      }
    },
    color1: {
      hairType: DataTypes.INTEGER,
      default: 0,
      validiate: {
        min: 0,
        max: 4
      }
    },
    color2: {
      hairType: DataTypes.INTEGER,
      default: 0,
      validiate: {
        min: 0,
        max: 4
      }
    },
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
    Character.hasMany(models.ToDoTasks, {
      onDelete: "cascade"
    });
  };
  return Character;
};
