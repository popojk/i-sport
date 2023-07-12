const express = require('express')
const router = express.Router()
const upload = require('../../../middleware/multer')
const { authenticated, authenticatedOwner } = require('../../../middleware/api-auth')
const ownerController = require('../../../controllers/apis/owner-controller')

router.post('/users', ownerController.signUp)
router.get('/users/account', authenticated, authenticatedOwner, ownerController.getOwner)
router.put('/users/account', authenticated, authenticatedOwner, ownerController.putAccount)
router.put('/users/password', authenticated, authenticatedOwner, ownerController.putPassword)
router.get('/stores', authenticated, authenticatedOwner, ownerController.getStores)
router.post('/stores', authenticated, authenticatedOwner, upload.single('photo'), ownerController.postStore)
router.put('/stores/:store_id', authenticated, authenticatedOwner, upload.single('photo'), ownerController.putStore)
router.get('/stores/:store_id', authenticated, authenticatedOwner, ownerController.getStore)
router.get('/stores/:store_id/classes', authenticated, authenticatedOwner, ownerController.getClassSchedules)

module.exports = router
