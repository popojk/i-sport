const reservationServices = require('../../services/reservation-services')

const reservationController = {
  deleteReservation: (req, res, next) => {
    reservationServices.deleteReservation(req, (err, data) => err ? next(err) : res.json(data))
  }
}

module.exports = reservationController
