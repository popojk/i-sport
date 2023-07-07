const bcrypt = require('bcryptjs')
const { User, Store } = require('../models')
const sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const helpers = require('../_helpers')

const ownerServices = {
  signIn: (req, cb) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
      const data = {
        token,
        userId: userData.id,
        role: userData.role
      }
      cb(null, data)
    } catch (err) {
      cb(err)
    }
  },
  signUp: (req, cb) => {
    const { email, storeName, password, confirmPassword } = req.body
    if (!email || !storeName || !password) throw new Error('必須輸入所有欄位')
    if (password !== confirmPassword) throw new Error('第二次輸入密碼有誤')
    if (storeName.length > 50) throw new Error('商家名稱不可超過50字')
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
          storeName,
          role: 'owner'
        })
      })
      .then(user => {
        const userData = user.toJSON()
        delete userData.password
        const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
        const data = {
          message: '註冊成功',
          token,
          userId: userData.id
        }
        cb(null, data)
      })
      .catch(err => cb(err))
  },
  getOwner: (req, cb) => {
    return User.findByPk(helpers.getUser(req).id, {
      raw: true,
      attributes: ['id', 'email', 'storeName']
    })
      .then(user => {
        cb(null, user)
      })
      .catch(err => cb(err))
  },
  putAccount: (req, cb) => {
    try {
      const { email, storeName } = req.body
      if (storeName.length > 50) throw new Error('商家名稱不可超過50字')
      return Promise.all([
        User.findOne({ where: { email }, raw: true }),
        User.findByPk(helpers.getUser(req).id)
      ])
        .then(([emailUser, user]) => {
          if (emailUser && emailUser.email !== helpers.getUser(req).email) throw new Error('email已重複註冊')
          return user.update({
            email,
            storeName
          })
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
        user.update({
          password: hash
        })
      })
      .then(() => {
        return cb(null, { message: '更新成功' })
      })
      .catch(err => cb(err))
  },
  getStores: (req, cb) => {
    return Store.findAll({
      where: { userId: helpers.getUser(req).id },
      raw: true,
      attributes: ['id', 'storeName', 'photo', 'address', 'introduction',
        [sequelize.literal('(SELECT COUNT (*) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'reviewCounts'],
        [sequelize.literal('(SELECT ROUND(AVG (rating), 1) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'rating']
      ]
    })
      .then(stores => {
        if (stores.length === 0) throw new Error('沒有建立之場館')
        return cb(null, stores)
      })
      .catch(err => cb(err))
  }
}

module.exports = ownerServices
