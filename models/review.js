'use strict'
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
}
