'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserPlan = sequelize.define('UserPlan', {
    userId: DataTypes.INTEGER,
    planId: DataTypes.INTEGER,
    amountLeft: DataTypes.INTEGER,
    expireDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserPlan',
    tableName: 'User_plans',
    underscored: true
  })
  UserPlan.associate = function (models) {
    // associations can be defined here
    UserPlan.belongsTo(models.User, { foreignKey: 'userId' })
    UserPlan.belongsTo(models.Plan, { foreignKey: 'planId' })
    UserPlan.belongsTo(models.Store, { foreignKey: 'storeId' })
    UserPlan.hasMany(models.Reservation, { foreignKey: 'userPlanId' })
  }
  return UserPlan
}
