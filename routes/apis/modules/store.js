const express = require('express')
const router = express.Router()
const storeController = require('../../../controllers/apis/store-controller')

router.get('/', storeController.getStores)

module.exports = router
