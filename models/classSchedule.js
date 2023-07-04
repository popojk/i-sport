'use strict'
module.exports = (sequelize, DataTypes) => {
  const ClassSchedule = sequelize.define('ClassSchedule', {
    weekDay: DataTypes.INTEGER,
    className: DataTypes.STRING,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    headcount: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ClassSchedule',
    tableName: 'ClassSchedules',
    underscored: true
  })
  ClassSchedule.associate = function (models) {
    // associations can be defined here
    ClassSchedule.belongsTo(models.Store, { foreignKey: 'storeId' })
    ClassSchedule.hasMany(models.Class, { foreignKey: 'classScheduleId' })
  }
  return ClassSchedule
}
