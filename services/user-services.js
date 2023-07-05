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
  },
  signUp: (req, cb) => {
    const { email, password, confirmPassword } = req.body
    if (password !== confirmPassword) throw new Error('第二次輸入密碼有誤')
    User.findOne({
      where: { email }
    })
      .then(user => {
        if (user) throw new Error('email已重複註冊')
        return bcrypt.hash(password, 10)
      })
      .then(hash => {
        return User.create({
          email,
          password: hash,
          nickname: '匿名',
          role: 'user'
        })
      })
      .then(user => {
        const userData = user.toJSON()
        delete userData.password
        const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
        const data = {
          message: '註冊成功',
          token,
          userId: userData.id,
          avatar: userData.avatar
        }
        cb(null, data)
      })
      .catch(err => cb(err))
  }
}

module.exports = userServices
