const express = require('express')
const router = express.Router()
const { authenticated, authenticatedUser } = require('../../../middleware/api-auth')
const orderController = require('../../../controllers/apis/order-controller')

router.post('/', authenticated, authenticatedUser, orderController.postOrder)
router.post('/newpaycallback', orderController.newpayCallBack)

module.exports = router
