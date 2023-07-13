const storeServices = require('../../services/store-services')

const storeController = {
  getStores: (req, res, next) => {
    storeServices.getStores(req, (err, data) => err ? next(err) : res.json(data))
  },
  getStore: (req, res, next) => {
    storeServices.getStore(req, (err, data) => err ? next(err) : res.json(data))
  },
  getClasses: (req, res, next) => {
    storeServices.getClasses(req, (err, data) => err ? next(err) : res.json(data))
  },
  getPlans: (req, res, next) => {
    storeServices.getPlans(req, (err, data) => err ? next(err) : res.json(data))
  },
  getReviews: (req, res, next) => {
    storeServices.getReviews(req, (err, data) => err ? next(err) : res.json(data))
  },
  postReview: (req, res, next) => {
    storeServices.postReview(req, (err, data) => err ? next(err) : res.json(data))
  },
  postLike: (req, res, next) => {
    storeServices.postLike(req, (err, data) => err ? next(err) : res.json(data))
  },
  postUnlike: (req, res, next) => {
    storeServices.postUnlike(req, (err, data) => err ? next(err) : res.json(data))
  }
}

module.exports = storeController
