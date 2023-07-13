const userServices = require('../../services/user-services')

const userController = {
  signIn: (req, res, next) => {
    userServices.signIn(req, (err, data) => err ? next(err) : res.json(data))
  },
  signUp: (req, res, next) => {
    userServices.signUp(req, (err, data) => err ? next(err) : res.json(data))
  },
  getUser: (req, res, next) => {
    userServices.getUser(req, (err, data) => err ? next(err) : res.json(data))
  },
  putAccount: (req, res, next) => {
    userServices.putAccount(req, (err, data) => err ? next(err) : res.json(data))
  },
  putPassword: (req, res, next) => {
    userServices.putPassword(req, (err, data) => err ? next(err) : res.json(data))
  },
  getUserPlans: (req, res, next) => {
    userServices.getUserPlans(req, (err, data) => err ? next(err) : res.json(data))
  },
  getUserCollections: (req, res, next) => {
    userServices.getUserCollections(req, (err, data) => err ? next(err) : res.json(data))
  },
  getUserReservations: (req, res, next) => {
    userServices.getUserReservations(req, (err, data) => err ? next(err) : res.json(data))
  }
}

module.exports = userController
