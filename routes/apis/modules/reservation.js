const express = require('express')
const router = express.Router()
const reservationController = require('../../../controllers/apis/reservation-controller')

router.delete('/:reservation_id', reservationController.deleteReservation)

module.exports = router
