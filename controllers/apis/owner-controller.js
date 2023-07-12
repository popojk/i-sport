const ownerServices = require('../../services/owner-services')

const ownerController = {
  signIn: (req, res, next) => {
    ownerServices.signIn(req, (err, data) => err ? next(err) : res.json(data))
  },
  signUp: (req, res, next) => {
    ownerServices.signUp(req, (err, data) => err ? next(err) : res.json(data))
  },
  getOwner: (req, res, next) => {
    ownerServices.getOwner(req, (err, data) => err ? next(err) : res.json(data))
  },
  putAccount: (req, res, next) => {
    ownerServices.putAccount(req, (err, data) => err ? next(err) : res.json(data))
  },
  putPassword: (req, res, next) => {
    ownerServices.putPassword(req, (err, data) => err ? next(err) : res.json(data))
  },
  getStores: (req, res, next) => {
    ownerServices.getStores(req, (err, data) => err ? next(err) : res.json(data))
  },
  postStore: (req, res, next) => {
    ownerServices.postStore(req, (err, data) => err ? next(err) : res.json(data))
  },
  putStore: (req, res, next) => {
    ownerServices.putStore(req, (err, data) => err ? next(err) : res.json(data))
  },
  getStore: (req, res, next) => {
    ownerServices.getStore(req, (err, data) => err ? next(err) : res.json(data))
  },
  getClassSchedules: (req, res, next) => {
    ownerServices.getClassSchedules(req, (err, data) => err ? next(err) : res.json(data))
  },
  postClassSchedules: (req, res, next) => {
    ownerServices.postClassSchedules(req, (err, data) => err ? next(err) : res.json(data))
  }
}

module.exports = ownerController
