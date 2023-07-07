const express = require('express')
const router = express.Router()
const storeController = require('../../../controllers/apis/store-controller')

router.get('/', storeController.getStores)
router.get('/:store_id', storeController.getStore)

module.exports = router
