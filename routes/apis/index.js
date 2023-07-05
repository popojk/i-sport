const express = require('express')
const router = express.Router()
const userController = require('../../controllers/apis/user-controller')
const passport = require('../../config/passport')
const { apiErrorHandler } = require('../../middleware/error-handler')
const { authenticated, authenticatedUser, authenticatedOwner } = require('../../middleware/api-auth')
const user = require('./modules/user')

router.post('/signin', passport.authenticate('local', { session: false }), authenticatedUser, userController.signIn)
router.use('/users', user)

router.use('/', apiErrorHandler)

module.exports = router
