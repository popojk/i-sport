'use strict'
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    trade_info: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    plan_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    underscored: true
  })
  Order.associate = function (models) {
    // associations can be defined here
    Order.belongsTo(models.User, { foreignKey: 'userId' })
    Order.belongsTo(models.Plan, { foreignKey: 'planId' })
    Order.belongsTo(models.Store, { foreignKey: 'storeId' })
  }
  return Order
}
