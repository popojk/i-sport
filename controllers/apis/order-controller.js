const orderServices = require('../../services/order-services')

const orderController = {
  postOrder: (req, res, next) => {
    orderServices.postOrder(req, (err, data) => err ? next(err) : res.json(data))
  },
  newpayCallBack: (req, res, next) => {
    orderServices.newpayCallBack(req, (err, data) => err ? next(err) : res.json(data))
  },
}

module.exports = orderController
