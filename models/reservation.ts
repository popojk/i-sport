'use strict';

import { Model, Sequelize, DataTypes } from 'sequelize';

interface ReservationAttributes {
  id: number;
  userId: number;
  classId: number;
  userPlanId: number;
  remark?: string;
}

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Reservation extends Model<ReservationAttributes> implements ReservationAttributes {
    id!: number;
    userId!: number;
    classId!: number;
    userPlanId!: number;
    remark!: string;
    static associate(models: any) {
      Reservation.belongsTo(models.User, { foreignKey: 'userId' });
      Reservation.belongsTo(models.Class, { foreignKey: 'classId' });
      Reservation.belongsTo(models.UserPlan, { foreignKey: 'userPlanId' });
    }
  }
  Reservation.init({
    id: {
      type: dataTypes.NUMBER,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    userPlanId: DataTypes.INTEGER,
    remark: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reservation',
    tableName: 'Reservations',
    underscored: true
  });
  return Reservation;
};

/*
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    userId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    userPlanId: DataTypes.INTEGER,
    remark: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reservation',
    tableName: 'Reservations',
    underscored: true
  })
  Reservation.associate = function (models) {
    // associations can be defined here
    Reservation.belongsTo(models.User, { foreignKey: 'userId' })
    Reservation.belongsTo(models.Class, { foreignKey: 'classId' })
    Reservation.belongsTo(models.UserPlan, { foreignKey: 'userPlanId' })
  }
  return Reservation
} */
