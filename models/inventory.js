module.exports = function(sequelize, DataTypes) {
    const powerUp = sequelize.define("powerUp", {
        powerUpName: {
            type: DataTypes.STRING,
            allowNull: false
          },
          powerUpType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isIn: ["HealthRecovery", "ExperienceBoost", "ResetTimer"]
            }
          }
    //   armorName: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    //   },
    //   AC: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate: {
    //       min: 6,
    //       max: 12
    //     }
    //   },
    //   dexMod: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate: {
    //       min: 0,
    //       max: 4
    //     }
    //   },
    //   armorType: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     validate: {
    //       isIn: ["Light", "Medium", "Heavy", "Shield"]
    //     }
    //   },
    //   armorName: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     validate: {
    //       isIn: [
    //         "Padded",
    //         "Leather",
    //         "Studded Leather",
    //         "Hide",
    //         "Chain Shirt",
    //         "Scale Mail",
    //         "Breastplate",
    //         "Half Plate",
    //         "Ring Mail",
    //         "Chain Mail",
    //         "Splint",
    //         "Plate",
    //         "Shield"
    //       ]
    //     }
    //   }
    });
    powerUp.associate = function(models) {
      powerUp.hasMany(models.character, {
        onDelete: "cascade"
      });
    };
    return powerUp;
  };
  