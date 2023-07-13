const bcrypt = require('bcryptjs')
const { User, Store, ClassSchedule, Plan, Review } = require('../models')
const sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const helpers = require('../_helpers')
const { imgurFileHandler } = require('../helpers/file-helpers')

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
  },
  postStore: (req, cb) => {
    const { storeName, address, introduction, phone, email } = req.body
    const { file } = req
    if (!storeName || !address || !introduction || !phone || !email || !file) throw new Error('所有欄位必須輸入')
    if (storeName.length > 50) throw new Error('場館名稱不可超過50字元')
    if (address.length > 100) throw new Error('地址不可超過100字元')
    if (introduction.length > 300) throw new Error('場館介紹不可超過300字元')
    if (phone.length > 100) throw new Error('電話不可超過100字元')
    return imgurFileHandler(file)
      .then(photoFilePath => {
        if (!photoFilePath) throw new Error('照片上傳失敗')
        return Store.create({
          email,
          storeName,
          address,
          introduction,
          phone,
          photo: photoFilePath,
          userId: helpers.getUser(req).id
        })
      })
      .then(() => {
        return cb(null, '場館建立完成')
      })
      .catch(err => cb(err))
  },
  putStore: (req, cb) => {
    const { storeName, address, introduction, phone, email } = req.body
    const { file } = req
    if (!storeName || !address || !introduction || !phone || !email || !file) throw new Error('所有欄位必須輸入')
    if (storeName.length > 50) throw new Error('場館名稱不可超過50字元')
    if (address.length > 100) throw new Error('地址不可超過100字元')
    if (introduction.length > 300) throw new Error('場館介紹不可超過300字元')
    if (phone.length > 100) throw new Error('電話不可超過100字元')
    if (JSON.stringify(file) !== '{}' && file !== undefined) {
      return Promise.all([
        Store.findOne({
          where: {
            id: req.params.store_id,
            userId: helpers.getUser(req).id
          }
        }),
        imgurFileHandler(file)
      ])
        .then(([store, photoFilePath]) => {
          if (!store) throw new Error('場館不存在')
          if (!photoFilePath) throw new Error('照片上傳失敗')
          return store.update({
            email,
            storeName,
            address,
            introduction,
            phone,
            photo: photoFilePath
          })
        })
        .then(() => {
          return cb(null, '場館更新完成')
        })
        .catch(err => cb(err))
    } else {
      return Store.findOne({
        id: req.params.store_id,
        userId: helpers.getUser(req).id
      })
        .then(store => {
          if (!store) throw new Error('場館不存在')
          return store.update({
            email,
            storeName,
            address,
            introduction,
            phone
          })
        })
        .then(() => {
          return cb(null, '場館更新完成')
        })
        .catch(err => cb(err))
    }
  },
  getStore: (req, cb) => {
    return Store.findOne({
      where: {
        id: req.params.store_id,
        userId: helpers.getUser(req).id
      },
      raw: true,
      attributes: ['id', 'storeName', 'photo', 'address', 'introduction', 'phone', 'email',
        [sequelize.literal('(SELECT COUNT (*) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'reviewCounts'],
        [sequelize.literal('(SELECT ROUND(AVG (rating), 1) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'rating']
      ]
    })
      .then(store => {
        if (!store) throw new Error('場館不存在')
        return cb(null, store)
      })
      .catch(err => cb(err))
  },
  getClassSchedules: (req, cb) => {
    return ClassSchedule.findAll({
      where: [{ store_id: req.params.store_id },
        { '$Store.user_id$': helpers.getUser(req).id }],
      raw: true,
      nest: true,
      include: {
        model: Store,
        as: 'Store'
      },
      order: [['week_day', 'ASC']],
      attributes: ['id', 'weekDay', 'className', 'startTime', 'endTime', 'headCount']
    })
      .then(schedules => {
        if (schedules.length === 0) throw new Error('場館無課表')
        const data = schedules.map(schedule => {
          delete schedule.Store
          return schedule
        })
        return cb(null, data)
      })
      .catch(err => cb(err))
  },
  postClassSchedules: (req, cb) => {
    const { weekDay, className, headcount, startTime, endTime } = req.body
    if (!weekDay || !className || !headcount || !startTime || !endTime) throw new Error('所有欄位必須輸入')
    if (className.length > 50) throw new Error('課程名稱不可超過50字元')
    const weekDays = {
      星期日: 0,
      星期一: 1,
      星期二: 2,
      星期三: 3,
      星期四: 4,
      星期五: 5,
      星期六: 6
    }
    return ClassSchedule.create({
      weekDay: weekDays[weekDay],
      className,
      headcount,
      startTime,
      endTime,
      storeId: req.params.store_id
    })
      .then(() => {
        cb(null, '課表新增成功')
      })
      .catch(err => cb(err))
  },
  putClassSchedule: (req, cb) => {
    const { weekDay, className, headcount, startTime, endTime } = req.body
    if (!weekDay || !className || !headcount || !startTime || !endTime) throw new Error('所有欄位必須輸入')
    if (className.length > 50) throw new Error('課程名稱不可超過50字元')
    const weekDays = {
      星期日: 0,
      星期一: 1,
      星期二: 2,
      星期三: 3,
      星期四: 4,
      星期五: 5,
      星期六: 6
    }
    return ClassSchedule.findOne({
      where: [{ id: req.params.schedule_id },
        { '$Store.user_id$': helpers.getUser(req).id }],
      include: {
        model: Store,
        as: 'Store'
      }
    })
      .then(schedule => {
        if (!schedule) throw new Error('課表不存在')
        return schedule.update({
          weekDay: weekDays[weekDay],
          className,
          headcount,
          startTime,
          endTime,
          storeId: req.params.store_id
        })
      })
      .then(() => {
        return cb(null, '更新成功')
      })
      .catch(err => cb(err))
  },
  deleteClassSchedule: (req, cb) => {
    return ClassSchedule.findOne({
      where: [{ id: req.params.schedule_id },
        { '$Store.user_id$': helpers.getUser(req).id }],
      include: {
        model: Store,
        as: 'Store'
      }
    })
      .then(schedule => {
        if (!schedule) throw new Error('課表不存在')
        return schedule.destroy()
      })
      .then(() => {
        return cb(null, '課表刪除成功')
      })
      .catch(err => cb(err))
  },
  getStorePlans: (req, cb) => {
    return Plan.findAll({
      where: [{ store_id: req.params.store_id },
        { '$Store.user_id$': helpers.getUser(req).id }],
      include: {
        model: Store,
        as: 'Store'
      },
      attributes: ['id', 'planName', 'planAmount', 'price', 'planType'],
      order: [['price', 'ASC']],
      raw: true,
      nest: true
    })
      .then(plans => {
        if (plans.length === 0) throw new Error('場館無方案')
        const data = plans.map(plan => {
          delete plan.Store
          return plan
        })
        return cb(null, data)
      })
      .catch(err => cb(err))
  },
  postStorePlans: (req, cb) => {
    const { planName, planType, planAmount, price } = req.body
    if (!planName || !planType || !planAmount || !price) throw new Error('所有欄位必須輸入')
    if (planName.length > 50) throw new Error('方案名稱不可超過50字元')
    return Plan.create({
      planName,
      planType,
      planAmount,
      price,
      storeId: req.params.store_id
    })
      .then(() => {
        return cb(null, '方案新增成功')
      })
      .catch(err => cb(err))
  },
  putStorePlan: (req, cb) => {
    const { planName, planType, planAmount, price } = req.body
    if (!planName || !planType || !planAmount || !price) throw new Error('所有欄位必須輸入')
    if (planName.length > 50) throw new Error('方案名稱不可超過50字元')
    return Plan.findOne({
      where: [{ id: req.params.plan_id },
        { '$Store.user_id$': helpers.getUser(req).id }],
      include: {
        model: Store,
        as: 'Store'
      }
    })
      .then(plan => {
        if (!plan) throw new Error('方案不存在')
        return plan.update({
          planName,
          planType,
          planAmount,
          price
        })
      })
      .then(() => {
        return cb(null, '方案更新成功')
      })
      .catch(err => cb(err))
  },
  deleteStorePlan: (req, cb) => {
    return Plan.findOne({
      where: [{ id: req.params.plan_id },
        { '$Store.user_id$': helpers.getUser(req).id }],
      include: {
        model: Store,
        as: 'Store'
      }
    })
      .then(plan => {
        if (!plan) throw new Error('方案不存在')
        return plan.destroy()
      })
      .then(() => {
        return cb(null, '方案刪除成功')
      })
      .catch(err => cb(err))
  },
  getStoreReviews: (req, cb) => {
    return Review.findAll({
      where: [{ store_id: req.params.store_id },
        { '$Store.user_id$': helpers.getUser(req).id }],
      include: {
        model: Store,
        as: 'Store'
      },
      attributes: ['id', 'createdAt', 'rating', 'content',
        [sequelize.literal('(SELECT avatar FROM Users WHERE Users.id = Review.user_id)'), 'avatar'],
        [sequelize.literal('(SELECT nickname FROM Users WHERE Users.id = Review.user_id)'), 'nickname']
      ],
      raw: true,
      nest: true
    })
      .then(reviews => {
        if (reviews.length === 0) throw new Error('商家無評價')
        const data = reviews.map(review => {
          delete review.Store
          review.createdAt = `${review.createdAt.getFullYear()}-${review.createdAt.getMonth() + 1}-${review.createdAt.getDate()}`
          return review
        })
        return cb(null, data)
      })
      .catch(err => cb(err))
  }
}

module.exports = ownerServices
