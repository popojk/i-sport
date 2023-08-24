'use strict'

import { Model, Sequelize, DataTypes } from 'sequelize';

interface OrderAttributes {
  id: number;
  tradeInfo: string;
  orderNo: string;
  userId: number;
  planId: number;
  storeId: number;
}

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Order extends Model<OrderAttributes> implements OrderAttributes {
    id!: number;
    tradeInfo!: string;
    orderNo!: string;
    userId!: number;
    planId!: number;
    storeId!: number;
    static associate(models: any) {
      Order.hasMany(models.Store, { foreignKey: 'userId' });
      Order.hasMany(models.Collection, { foreignKey: 'userId' });
      Order.hasMany(models.Review, { foreignKey: 'userId' });
      Order.hasMany(models.UserPlan, { foreignKey: 'userId' });
      Order.hasMany(models.Reservation, { foreignKey: 'userId' });
      Order.hasMany(models.Order, { foreignKey: 'userId' });
    }
  }
  Order.init({
    id: {
      type: dataTypes.NUMBER,
      primaryKey: true
    },
    tradeInfo: DataTypes.TEXT,
    orderNo: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    planId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    underscored: true
  });
  return Order;
};
/*
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    tradeInfo: DataTypes.TEXT,
    orderNo: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    planId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER
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
} */
