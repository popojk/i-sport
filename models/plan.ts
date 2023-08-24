'use strict';

import { Model, Sequelize, DataTypes } from 'sequelize';

interface PlanAttributes {
  id: number;
  planName: string;
  planAmount: number;
  price: number;
  planType: string;
  storeId: number;
}

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Plan extends Model<PlanAttributes> implements PlanAttributes {
    id!: number;
    planName!: string;
    planAmount!: number;
    price!: number;
    planType!: string;
    storeId!: number;
    static associate(models: any) {
      Plan.belongsTo(models.Store, { foreignKey: 'storeId' })
      Plan.hasMany(models.UserPlan, { foreignKey: 'planId' })
      Plan.hasMany(models.Order, { foreignKey: 'planId' })
    }
  }
  Plan.init({
    id: {
      type: dataTypes.NUMBER,
      primaryKey: true
    },
    planName: DataTypes.STRING,
    planAmount: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    planType: DataTypes.STRING,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Plan',
    tableName: 'Plans',
    underscored: true
  });
  return Plan;
};

/*
module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    planName: DataTypes.STRING,
    planAmount: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    planType: DataTypes.STRING,
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
    Plan.hasMany(models.Order, { foreignKey: 'planId' })
  }
  return Plan
} */
