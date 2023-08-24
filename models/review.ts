'use strict';

import { Model, Sequelize, DataTypes } from 'sequelize';

interface ReviewAttributes {
  id: number;
  content: string;
  rating: number;
  storeId: number;
  userId: number;
}

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Review extends Model<ReviewAttributes> implements ReviewAttributes {
    id!: number;
    content!: string;
    rating!: number;
    storeId!: number;
    userId!: number;
    static associate(models: any) {
      Review.belongsTo(models.User, { foreignKey: 'userId' });
      Review.belongsTo(models.Store, { foreignKey: 'storeId' });
    }
  }
  Review.init({
    id: {
      type: dataTypes.NUMBER,
      primaryKey: true
    },
    content: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    storeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'Reviews',
    underscored: true
  });
  return Review;
};

/*
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    content: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    storeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'Reviews',
    underscored: true
  })
  Review.associate = function (models) {
    Review.belongsTo(models.User, { foreignKey: 'userId' })
    Review.belongsTo(models.Store, { foreignKey: 'storeId' })
  }
  return Review
} */
