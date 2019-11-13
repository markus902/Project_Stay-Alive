module.exports = function (sequelize, DataTypes) {
  const toDoTask = sequelize.define("toDoTask", {
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
    // toDoTaskID: {

    // },
    // frequency: {
    //   type: DataTypes.DATETIME,
    //   allowNull: false,
    //   validate: {
    //     isIn: ["Daily", "Weekly", "Monthly"]
    //   }
    // },
  });
  // toDoTask.associate = function(models) {
  //   toDoTask.hasMany(models.character, {
  //     onDelete: "cascade"
  //   });
  // };
  return toDoTask;
};
