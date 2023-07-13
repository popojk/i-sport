const { Reservation, UserPlan } = require('../models')

const reservationServices = {
  deleteReservation: (req, cb) => {
    return Reservation.findByPk(req.params.reservation_id)
      .then(reservation => {
        if (!reservation) throw Error('預約不存在')
        return UserPlan.findOne({
          where: { id: reservation.userPlanId }
        })
          .then(userPlan => {
            reservation.destroy()
            if (userPlan.amountLeft) {
              return userPlan.update({
                amountLeft: userPlan.amountLeft + 1
              })
            }
          })
          .then(() => {
            return cb(null, '刪除成功')
          })
          .catch(err => cb(err))
      })
      .catch(err => cb(err))
  }
}

module.exports = reservationServices
