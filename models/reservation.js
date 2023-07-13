'use strict'
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    userId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    userPlanId: DataTypes.INTEGER,
    remark: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reservation',
    tableName: 'Reservations',
    underscored: true
  })
  Reservation.associate = function (models) {
    // associations can be defined here
    Reservation.belongsTo(models.User, { foreignKey: 'userId' })
    Reservation.belongsTo(models.Class, { foreignKey: 'classId' })
    Reservation.belongsTo(models.UserPlan, { foreignKey: 'userPlanId' })
  }
  return Reservation
}
