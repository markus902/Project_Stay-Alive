module.exports = function (sequelize, DataTypes) {
  const ToDoTasks = sequelize.define("ToDoTasks", {
    taskName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taskNotes: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // Needs Review.
        // isIn: ["Challenge Rating 1-5"] // Need to add experience rewarded
      }
    },
    frequency: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isIn: ["Daily", "Weekly", "Monthly"]
      }
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        //   isIn: ["Daily", "Weekly", "Monthly"]
      }
    }

  },
    { freezeTableName: true });


  ToDoTasks.associate = function (models) {
    ToDoTasks.belongsTo(models.Character, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return ToDoTasks;
};
