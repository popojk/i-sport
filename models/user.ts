'use strict';

import { Model, Sequelize, DataTypes } from 'sequelize';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  avatar?: string;
  nickname?: string;
  role: string;
  storeName?: string;
}

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id!: number;
    email!: string;
    password!: string;
    avatar?: string;
    nickname?: string;
    role!: string;
    storeName?: string;
    static associate(models: any) {
      User.hasMany(models.Store, { foreignKey: 'userId' });
      User.hasMany(models.Collection, { foreignKey: 'userId' });
      User.hasMany(models.Review, { foreignKey: 'userId' });
      User.hasMany(models.UserPlan, { foreignKey: 'userId' });
      User.hasMany(models.Reservation, { foreignKey: 'userId' });
      User.hasMany(models.Order, { foreignKey: 'userId' });
    }
  }
  User.init({
    id: {
      type: dataTypes.NUMBER,
      primaryKey: true
    },
    email: dataTypes.STRING,
    password: dataTypes.STRING,
    avatar: dataTypes.STRING,
    nickname: dataTypes.STRING,
    role: dataTypes.STRING,
    storeName: dataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  });
  return User;
};
/*
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    nickname: DataTypes.STRING,
    role: DataTypes.STRING,
    storeName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  })
  User.associate = function (models) {
    User.hasMany(models.Store, { foreignKey: 'userId' })
    User.hasMany(models.Collection, { foreignKey: 'userId' })
    User.hasMany(models.Review, { foreignKey: 'userId' })
    User.hasMany(models.UserPlan, { foreignKey: 'userId' })
    User.hasMany(models.Reservation, { foreignKey: 'userId' })
    User.hasMany(models.Order, { foreignKey: 'userId' })
  }
  return User
} */
