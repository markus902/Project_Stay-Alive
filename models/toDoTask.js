module.exports = function (sequelize, DataTypes) {
  const ToDoTasks = sequelize.define("ToDoTasks", {
    taskName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taskNotes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskDifficulty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    frequency: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isIn: ["Daily", "Weekly", "Monthly"]
      }
    },
    complete: {
      type: DataTypes.DATE,
      allowNull: false,
      default: "1980-01-01 12:00"
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
