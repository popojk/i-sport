const userServices = require('../../services/user-services')

const userController = {
  signIn: (req, res, next) => {
    userServices.signIn(req, (err, data) => err ? next(err) : res.json(data))
  },
  signUp: (req, res, next) => {
    userServices.signUp(req, (err, data) => err ? next(err) : res.json(data))
  }
}

module.exports = userController
