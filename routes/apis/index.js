const express = require('express')
const router = express.Router()
const userController = require('../../controllers/apis/user-controller')
const ownerController = require('../../controllers/apis/owner-controller')
const passport = require('../../config/passport')
const { apiErrorHandler } = require('../../middleware/error-handler')
const { authenticated, authenticatedUser, authenticatedOwner } = require('../../middleware/api-auth')
const user = require('./modules/user')
const owner = require('./modules/owner')
const store = require('./modules/store')
const cls = require('./modules/class')
const reservation = require('./modules/reservation')

router.post('/signin', passport.authenticate('local', { session: false }), authenticatedUser, userController.signIn)
router.post('/owner/signin', passport.authenticate('local', { session: false }), authenticatedOwner, ownerController.signIn)
router.use('/owner', owner)
router.use('/users', user)
router.use('/stores', authenticated, authenticatedUser, store)
router.use('/classes', authenticated, authenticatedUser, cls)
router.use('/reservations', authenticated, authenticatedUser, reservation)

router.use('/', apiErrorHandler)

module.exports = router
