'use strict';

import { Model, Sequelize, DataTypes } from 'sequelize';

interface ClassScheduleAttributes {
  id: number;
  weekDay: number;
  className: string;
  startTime: string;
  endTime: string;
  headcount: number;
  storeId: number;
}

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class ClassSchedule extends Model<ClassScheduleAttributes> implements ClassScheduleAttributes {
    id!: number;
    weekDay!: number;
    className!: string;
    startTime!: string;
    endTime!: string;
    headcount!: number;
    storeId!: number;
    static associate(models: any) {
      ClassSchedule.belongsTo(models.Store, { foreignKey: 'storeId' });
      ClassSchedule.hasMany(models.Class, { foreignKey: 'classScheduleId' });
    }
  }
  ClassSchedule.init({
    id: {
      type: dataTypes.NUMBER,
      primaryKey: true
    },
    weekDay: DataTypes.INTEGER,
    className: DataTypes.STRING,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    headcount: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ClassSchedule',
    tableName: 'Class_schedules',
    underscored: true
  });
  return ClassSchedule;
};

/*
module.exports = (sequelize, DataTypes) => {
  const ClassSchedule = sequelize.define('ClassSchedule', {
    weekDay: DataTypes.INTEGER,
    className: DataTypes.STRING,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    headcount: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ClassSchedule',
    tableName: 'Class_schedules',
    underscored: true
  })
  ClassSchedule.associate = function (models) {
    // associations can be defined here
    ClassSchedule.belongsTo(models.Store, { foreignKey: 'storeId' })
    ClassSchedule.hasMany(models.Class, { foreignKey: 'classScheduleId' })
  }
  return ClassSchedule
} */
