module.exports = function (sequelize, DataTypes) {
  const Character = sequelize.define("Character", {
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
        max: 3
      }
    },
    hairType: {
      type: DataTypes.INTEGER,
      default: 0,
      validiate: {
        min: 0,
        max: 3
      }
    },
    color1: {
      type: DataTypes.INTEGER,
      default: 0,
      validiate: {
        min: 0,
        max: 3
      }
    },
    color2: {
      type: DataTypes.INTEGER,
      default: 0,
      validiate: {
        min: 0,
        max: 3
      }
    },
    UserId:{
      type: DataTypes.INTEGER
    }
  },
    { freezeTableName: true });


  Character.associate = function (models) {
    Character.hasOne(models.User, {
      onDelete: "cascade"
    });
    Character.hasMany(models.ToDoTasks, {
      onDelete: "cascade"
    });
    Character.hasMany(models.CharacterPowerUps);
    // Character.belongsToMany('PowerUp', {through: 'CharacterPowerUps'});
  };
  return Character;
};
