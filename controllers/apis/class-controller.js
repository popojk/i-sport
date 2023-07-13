const classServices = require('../../services/class-services')

const classController = {
  postClass: (req, res, next) => {
    classServices.postClass(req, (err, data) => err ? next(err) : res.json(data))
  }
}

module.exports = classController
