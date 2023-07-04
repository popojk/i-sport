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
    tableName: 'UserPlans',
    underscored: true
  })
  UserPlan.associate = function (models) {
    // associations can be defined here
    UserPlan.belongsTo(models.User, { foreignKey: 'userId' })
    UserPlan.belongsTo(models.Plan, { foreignKey: 'planId' })
  }
  return UserPlan
}
