'use strict'
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    date: DataTypes.DATE,
    storeId: DataTypes.INTEGER,
    classScheduleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Class',
    tableName: 'Classes',
    underscored: true
  })
  Class.associate = function (models) {
    // associations can be defined here
    Class.belongsTo(models.ClassSchedule, { foreignKey: 'classScheduleId' })
    Class.hasMany(models.Reservation, { foreignKey: 'classId' })
  }
  return Class
}
