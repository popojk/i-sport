'use strict'
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    photo: DataTypes.STRING,
    address: DataTypes.STRING,
    introduction: DataTypes.STRING,
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
  }
  return Store
}
