const bcrypt = require('bcryptjs')
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { imgurFileHandler } = require('../helpers/file-helpers')
const helpers = require('../_helpers')

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
  },
  getUser: (req, cb) => {
    return User.findByPk(helpers.getUser(req).id, {
      raw: true,
      attributes: ['id', 'email', 'nickname', 'avatar']
    })
      .then(user => {
        cb(null, user)
      })
      .catch(err => cb(err))
  },
  putAccount: (req, cb) => {
    try {
      const { email, nickname } = req.body
      const { file } = req
      if (nickname.length > 50) throw new Error('暱稱名稱不可超過50字')
      return Promise.all([
        User.findOne({ where: { email }, raw: true }),
        User.findByPk(helpers.getUser(req).id)
      ])
        .then(([emailUser, user]) => {
          if (emailUser && emailUser.email !== helpers.getUser(req).email) throw new Error('email已重複註冊')
          if (JSON.stringify(file) !== '{}' && file !== undefined) {
            return imgurFileHandler(file)
              .then(avatarFilePath => {
                return user.update({
                  email,
                  nickname,
                  avatar: avatarFilePath || user.avatar
                })
              })
          } else {
            return user.update({
              email,
              nickname
            })
          }
        })
        .then(updatedUser => {
          cb(null, { message: '更新成功' })
        })
        .catch(err => cb(err))
    } catch (err) {
      cb(err)
    }
  },
  putPassword: (req, cb) => {
    const { password, confirmPassword } = req.body
    if (password !== confirmPassword) throw new Error('第二次輸入密碼有誤')
    return Promise.all([
      User.findByPk(helpers.getUser(req).id),
      bcrypt.hash(password, 10)
    ])
      .then(([user, hash]) => {
        console.log(hash)
        user.update({
          password: hash
        })
      })
      .then(() => {
        return cb(null, { message: '更新成功' })
      })
      .catch(err => cb(err))
  }
}

module.exports = userServices
