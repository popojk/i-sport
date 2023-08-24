'use strict';

import { Model, Sequelize, DataTypes } from 'sequelize';

interface UserPlanAttributes {
  id: number;
  userId: number;
  planId: number;
  amountLeft?: number;
  expireDate?: Date;
}

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class UserPlan extends Model<UserPlanAttributes> implements UserPlanAttributes {
    id!: number;
    userId!: number;
    planId!: number;
    amountLeft?: number;
    expireDate?: Date;
    static associate(models: any) {
      UserPlan.belongsTo(models.User, { foreignKey: 'userId' });
      UserPlan.belongsTo(models.Plan, { foreignKey: 'planId' });
      UserPlan.belongsTo(models.Store, { foreignKey: 'storeId' });
      UserPlan.hasMany(models.Reservation, { foreignKey: 'userPlanId' });
    }
  }
  UserPlan.init({
    id: {
      type: dataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    planId: DataTypes.INTEGER,
    amountLeft: DataTypes.INTEGER,
    expireDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserPlan',
    tableName: 'User_plans',
    underscored: true
  });
  return UserPlan;
};

/*
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
} */
