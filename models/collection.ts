'use strict';

import { Model, Sequelize, DataTypes } from 'sequelize';

interface CollectionAttributes {
  id: number;
  userId: number;
  storeId: number;
}

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Collection extends Model<CollectionAttributes> implements CollectionAttributes {
    id!: number;
    userId!: number;
    storeId!: number;
    static associate(models: any) {
      Collection.belongsTo(models.User, { foreignKey: 'userId' });
      Collection.belongsTo(models.Store, { foreignKey: 'storeId' });
    }
  }
  Collection.init({
    id: {
      type: dataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Collection',
    tableName: 'Collections',
    underscored: true
  });
  return Collection;
};

/*
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    userId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Collection',
    tableName: 'Collections',
    underscored: true
  })
  Collection.associate = function (models) {
    // associations can be defined here
    Collection.belongsTo(models.User, { foreignKey: 'userId' })
    Collection.belongsTo(models.Store, { foreignKey: 'storeId' })
  }
  return Collection
} */
