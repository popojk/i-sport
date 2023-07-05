const passport = require('../config/passport')
const helpers = require('../_helpers')

const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) return res.status(401).json({ status: 'error', message: 'unauthorized' })
    req.user = user
    next()
  })(req, res, next)
}

const authenticatedOwner = (req, res, next) => {
  if (helpers.getUser(req) && (helpers.getUser(req).role === 'owner')) return next()
  return res.status(403).json({ status: 'error', message: 'permission denied' })
}

const authenticatedUser = (req, res, next) => {
  if (helpers.getUser(req) && (helpers.getUser(req).role === 'user')) return next()
  return res.status(403).json({ status: 'error', message: 'permission denied' })
}

module.exports = {
  authenticated,
  authenticatedUser,
  authenticatedOwner
}
