const express = require('express')
const router = express.Router()
const { authenticated, authenticatedOwner } = require('../../../middleware/api-auth')
const ownerController = require('../../../controllers/apis/owner-controller')

router.post('/users', ownerController.signUp)
router.get('/users/account', authenticated, authenticatedOwner, ownerController.getOwner)
router.put('/users/account', authenticated, authenticatedOwner, ownerController.putAccount)
router.put('/users/password', authenticated, authenticatedOwner, ownerController.putPassword)
router.get('/stores', authenticated, authenticatedOwner, ownerController.getStores)

module.exports = router
