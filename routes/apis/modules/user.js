const express = require('express')
const router = express.Router()
const upload = require('../../../middleware/multer')
const userController = require('../../../controllers/apis/user-controller')
const { authenticated, authenticatedUser } = require('../../../middleware/api-auth')

router.post('/', userController.signUp)
router.get('/account', authenticated, authenticatedUser, userController.getUser)
router.put('/account', authenticated, authenticatedUser, upload.single('avatar'), userController.putAccount)
router.put('/password', authenticated, authenticatedUser, userController.putPassword)

module.exports = router
