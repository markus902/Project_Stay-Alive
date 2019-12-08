module.exports = function (sequelize, DataTypes) {
  const ToDoTasks = sequelize.define("ToDoTasks", {
    taskName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taskNotes: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taskFrequency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taskDifficulty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    complete: {
      type: DataTypes.DATE,
      default: "1980-01-01 12:00"
    },
    CharacterId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
    { freezeTableName: true });


  return ToDoTasks;
};
