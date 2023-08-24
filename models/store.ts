'use strict';

import { Model, Sequelize, DataTypes } from 'sequelize';

interface StoreAttributes {
  id: number;
  photo: string;
  address: string;
  introduction: string;
  lat?: number;
  lng?: number;
  email: string;
  phone: string;
  storeName: string;
  userId: number;
}

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Store extends Model<StoreAttributes> implements StoreAttributes {
    id!: number;
    photo!: string;
    address!: string;
    introduction!: string;
    lat?: number;
    lng?: number;
    email!: string;
    phone!: string;
    storeName!: string;
    userId!: number;
    static associate(models: any) {
      Store.belongsTo(models.User, { foreignKey: 'userId' });
      Store.hasMany(models.Collection, { foreignKey: 'storeId' });
      Store.hasMany(models.Review, { foreignKey: 'storeId' });
      Store.hasMany(models.Plan, { foreignKey: 'storeId' });
      Store.hasMany(models.ClassSchedule, { foreignKey: 'storeId' });
      Store.hasMany(models.UserPlan, { foreignKey: 'storeId' });
      Store.hasMany(models.Order, { foreignKey: 'storeId' });
    }
  }
  Store.init({
    id: {
      type: dataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true
    },
    photo: DataTypes.STRING,
    address: DataTypes.STRING,
    introduction: DataTypes.STRING,
    lat: DataTypes.DOUBLE,
    lng: DataTypes.DOUBLE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    storeName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Store',
    tableName: 'Stores',
    underscored: true
  });
  return Store;
};

/*
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    photo: DataTypes.STRING,
    address: DataTypes.STRING,
    introduction: DataTypes.STRING,
    lat: DataTypes.DOUBLE,
    lng: DataTypes.DOUBLE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    storeName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Store',
    tableName: 'Stores',
    underscored: true
  })
  Store.associate = function (models) {
    // associations can be defined here
    Store.belongsTo(models.User, { foreignKey: 'userId' })
    Store.hasMany(models.Collection, { foreignKey: 'storeId' })
    Store.hasMany(models.Review, { foreignKey: 'storeId' })
    Store.hasMany(models.Plan, { foreignKey: 'storeId' })
    Store.hasMany(models.ClassSchedule, { foreignKey: 'storeId' })
    Store.hasMany(models.UserPlan, { foreignKey: 'storeId' })
    Store.hasMany(models.Order, { foreignKey: 'storeId' })
  }
  return Store
} */
