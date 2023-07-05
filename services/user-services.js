const bcrypt = require('bcryptjs')
const { User } = require('../models')
const jwt = require('jsonwebtoken')

const userServices = {
  signIn: (req, cb) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
      const data = {
        token,
        userId: userData.id,
        avatar: userData.avatar
      }
      cb(null, data)
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = userServices
