const express = require('express')
const router = express.Router()
const upload = require('../../../middleware/multer')
const userController = require('../../../controllers/apis/user-controller')
const { authenticated, authenticatedUser } = require('../../../middleware/api-auth')

router.post('/', userController.signUp)
router.put('/account', authenticated, authenticatedUser, upload.single('avatar'), userController.putAccount)

module.exports = router
