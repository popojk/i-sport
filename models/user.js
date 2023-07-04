'use strict'
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
  }
  return User
}
