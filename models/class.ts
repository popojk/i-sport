'use strict';

import { Model, Sequelize, DataTypes } from 'sequelize';

interface ClassAttributes {
  id: number;
  date: Date;
  startDateTime: Date;
  storeId: number;
  classScheduleId: number;
}

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Class extends Model<ClassAttributes> implements ClassAttributes {
    id!: number;
    date!: Date;
    startDateTime!: Date;
    storeId!: number;
    classScheduleId!: number;
    static associate(models: any) {
      Class.belongsTo(models.ClassSchedule, { foreignKey: 'classScheduleId' });
      Class.hasMany(models.Reservation, { foreignKey: 'classId' });
    }
  }
  Class.init({
    id: {
      type: dataTypes.NUMBER,
      primaryKey: true
    },
    date: DataTypes.DATE,
    startDateTime: DataTypes.DATE,
    storeId: DataTypes.INTEGER,
    classScheduleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Class',
    tableName: 'Classes',
    underscored: true
  });
  return Class;
};

/*
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    date: DataTypes.DATE,
    startDateTime: DataTypes.DATE,
    storeId: DataTypes.INTEGER,
    classScheduleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Class',
    tableName: 'Classes',
    underscored: true
  })
  Class.associate = function (models) {
    // associations can be defined here
    Class.belongsTo(models.ClassSchedule, { foreignKey: 'classScheduleId' })
    Class.hasMany(models.Reservation, { foreignKey: 'classId' })
  }
  return Class
} */
