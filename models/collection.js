'use strict'
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
}
