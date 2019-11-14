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
        //   Need to add experience rewarded?
        isIn: ["Challenge Rating 1-5"]
      }
    },
    // characterID: {

    // },
    // ToDoTasksID: {

    // },
    // frequency: {
    //   type: DataTypes.DATETIME,
    //   allowNull: false,
    //   validate: {
    //     isIn: ["Daily", "Weekly", "Monthly"]
    //   }
    // },
  });
  ToDoTasks.associate = function(models) {
    ToDoTasks.hasMany(models.Character, {
      onDelete: "cascade"
    });
  };
  return ToDoTasks;
};
