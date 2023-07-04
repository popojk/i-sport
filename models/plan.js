'use strict'
module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    planName: DataTypes.STRING,
    planAmount: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    planType: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Plan',
    tableName: 'Plans',
    underscored: true
  })
  Plan.associate = function (models) {
    Plan.belongsTo(models.Store, { foreignKey: 'storeId' })
    Plan.hasMany(models.UserPlan, { foreignKey: 'planId' })
  }
  return Plan
}
