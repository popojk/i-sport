const { Class, UserPlan, Reservation } = require('../models')
const helpers = require('../_helpers')
const sequelize = require('sequelize')
const { Op } = require('sequelize')

const classServices = {
  postClass: (req, cb) => {
    try {
      const { userPlanId, remark } = req.body
      if (remark && remark.length > 50) throw new Error('備註不可超過50字元')
      return Promise.all([
        Class.findOne({
          where: { id: req.params.class_id },
          attributes: ['id', 'storeId', 'startDateTime',
            [sequelize.literal('(SELECT COUNT (*) FROM Reservations WHERE Reservations.class_id = Class.id)'), 'reservationCounts'],
            [sequelize.literal('(SELECT headcount FROM Class_schedules WHERE Class_schedules.id = Class.class_schedule_id)'), 'headcount']
          ],
          raw: true
        }),
        UserPlan.findOne({
          where: {
            [Op.or]: [
              [{ id: userPlanId }, { amount_left: { [Op.gt]: 0 } }],
              [{ id: userPlanId }, { expire_date: { [Op.gt]: new Date() } }]
            ]
          },
          attributes: ['id', 'amountLeft', 'expireDate',
            [sequelize.literal('(SELECT plan_name FROM Plans WHERE Plans.id = UserPlan.plan_id)'), 'planName'],
            [sequelize.literal('(SELECT plan_type FROM Plans WHERE Plans.id = UserPlan.plan_id)'), 'planType']
          ]
        })
      ])
        .then(([cls, userPlan]) => {
          if (cls.reservationCounts >= cls.headcount) throw new Error('課程已額滿')
          if (!userPlan) throw new Error('沒有適用方案')
          if (userPlan.planType === '天數' && userPlan.expireDate > cls.startDateTime) {
            return Reservation.create({
              userId: helpers.getUser(req).id,
              classId: cls.id,
              userPlanId: userPlan.id
            })
              .then(() => {
                return cb(null, '預約成功')
              })
              .catch(err => cb(err))
          } else {
            return Reservation.create({
              userId: helpers.getUser(req).id,
              classId: cls.id,
              userPlanId: userPlan.id
            })
              .then(() => {
                return userPlan.update({
                  amountLeft: userPlan.amountLeft - 1
                })
              })
              .then(() => {
                return cb(null, '預約成功')
              })
              .catch(err => cb(err))
          }
        })
        .catch(err => cb(err))
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = classServices
