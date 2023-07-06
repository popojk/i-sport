const storeServices = require('../../services/store-services')

const storeController = {
  getStores: (req, res, next) => {
    storeServices.getStores(req, (err, data) => err ? next(err) : res.json(data))
  }
}

module.exports = storeController
