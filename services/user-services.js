const bcrypt = require('bcryptjs')
const { User, UserPlan, Collection, Store, Reservation, Class } = require('../models')
const sequelize = require('sequelize')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const { imgurFileHandler } = require('../helpers/file-helpers')
const helpers = require('../_helpers')

const userServices = {
  signIn: (req, cb) => {
    // #swagger.tags = ['Users']
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
      const data = {
        token,
        userId: userData.id,
        avatar: userData.avatar,
        role: userData.role
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
          avatar: userData.avatar,
          role: userData.role
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
      if (!nickname) throw new Error('暱稱不可為空值')
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
        user.update({
          password: hash
        })
      })
      .then(() => {
        return cb(null, { message: '更新成功' })
      })
      .catch(err => cb(err))
  },
  getUserPlans: (req, cb) => {
    const storeId = req.query.store_id
    if (storeId) {
      return UserPlan.findAll({
        where: {
          [Op.or]: [
            [{ user_id: helpers.getUser(req).id },
              { store_id: storeId },
              { amount_left: { [Op.gt]: 0 } }],
            [{ user_id: helpers.getUser(req).id },
              { store_id: storeId },
              { expire_date: { [Op.gt]: new Date() } }]
          ]
        },
        attributes: ['id', 'amountLeft', 'expireDate',
          [sequelize.literal('(SELECT plan_name FROM Plans WHERE Plans.id = UserPlan.plan_id)'), 'planName'],
          [sequelize.literal('(SELECT plan_type FROM Plans WHERE Plans.id = UserPlan.plan_id)'), 'planType'],
          [sequelize.literal('(SELECT store_name FROM Stores WHERE Stores.id = UserPlan.store_id)'), 'StoreName']
        ],
        raw: true
      })
        .then(userPlans => {
          if (userPlans.length === 0) throw new Error('目前無有效方案')
          const data = userPlans.map(userPlan => {
            if (userPlan.planType === '天數') {
              const expireDate = userPlan.expireDate
              const today = new Date()
              const diffInMilliseconds = Math.abs(expireDate.getTime() - today.getTime())
              const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24))
              userPlan.amountLeft = diffInDays
              return userPlan
            }
            return userPlan
          })
          return cb(null, data)
        })
        .catch(err => cb(err))
    } else {
      return Store.findAll({
        where: [{ '$UserPlans.user_id$': helpers.getUser(req).id }],
        include: {
          model: UserPlan,
          as: 'UserPlans',
          where: {
            [Op.or]: [
              [{ amount_left: { [Op.gt]: 0 } }],
              [{ expire_date: { [Op.gt]: new Date() } }]
            ]
          },
          attributes: ['id', 'amountLeft', 'expireDate',
            [sequelize.literal('(SELECT plan_name FROM Plans WHERE Plans.id = UserPlans.plan_id)'), 'planName'],
            [sequelize.literal('(SELECT plan_type FROM Plans WHERE Plans.id = UserPlans.plan_id)'), 'planType'],
            [sequelize.literal('(SELECT store_name FROM Stores WHERE Stores.id = UserPlans.store_id)'), 'StoreName']
          ]
        },
        attributes: [['id', 'storeId'], 'storeName']
      })
        .then(stores => {
          const data = stores.map(store => {
            store.Plans = store.UserPlans.map(plan => {
              console.log(plan)
              if (plan.dataValues.planType === '天數') {
                const expireDate = plan.expireDate
                const today = new Date()
                const diffInMilliseconds = Math.abs(expireDate.getTime() - today.getTime())
                const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24))
                plan.amountLeft = diffInDays
                return plan
              }
              return plan
            })
            return store
          })
          return cb(null, data)
        })
        .catch(err => cb(err))
    }
  },
  getUserCollections: (req, cb) => {
    return Collection.findAll({
      where: { userId: helpers.getUser(req).id },
      raw: true,
      nest: true,
      include: {
        model: Store,
        attributes: ['id', 'storeName', 'photo', 'address', 'introduction',
          [sequelize.literal('(SELECT COUNT (*) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'reviewCounts'],
          [sequelize.literal('(SELECT ROUND(AVG (rating), 1) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'rating'],
          [sequelize.literal(`EXISTS(SELECT 1 FROM Collections WHERE Collections.store_id = Store.id AND Collections.user_id = ${helpers.getUser(req).id})`), 'isLiked']
        ]
      }
    })
      .then(collections => {
        if (collections.length === 0) throw new Error('沒有收藏場館')
        const data = collections.map(collection => {
          collection.isLiked = collection.isLiked === 1
          return collection.Store
        })
        return cb(null, data)
      })
      .catch(err => cb(err))
  },
  getUserReservations: (req, cb) => {
    return Reservation.findAll({
      where: [{ user_id: helpers.getUser(req).id },
        { '$Class.start_date_time$': { [Op.gt]: new Date() } }],
      raw: true,
      nest: true,
      include: {
        model: Class,
        as: 'Class',
        attributes: ['date',
          [sequelize.literal('(SELECT id FROM Stores WHERE Stores.id = Class.store_id)'), 'storeId'],
          [sequelize.literal('(SELECT store_name FROM Stores WHERE Stores.id = Class.store_id)'), 'storeName'],
          [sequelize.literal('(SELECT class_name FROM Class_schedules WHERE Class_schedules.id = Class.class_schedule_id)'), 'className'],
          [sequelize.literal('(SELECT start_time FROM Class_schedules WHERE Class_schedules.id = Class.class_schedule_id)'), 'startTime'],
          [sequelize.literal('(SELECT end_time FROM Class_schedules WHERE Class_schedules.id = Class.class_schedule_id)'), 'endTime'],
          [sequelize.literal('(SELECT week_day FROM Class_schedules WHERE Class_schedules.id = Class.class_schedule_id)'), 'weekDay']
        ]
      },
      order: [
        [{ model: Class, as: 'Class' }, 'date', 'ASC']
      ]
    })
      .then(reservations => {
        if (reservations.length === 0) throw new Error('目前無預約課程')
        const weekDays = ['日', '一', '二', '三', '四', '五', '六']
        const classesData = reservations.map(reservation => {
          const data = reservation.Class
          data.reservationId = reservation.id
          data.date = `${data.date.getFullYear()}-${data.date.getMonth() + 1}-${data.date.getDate()}`
          data.weekDay = weekDays[data.weekDay]
          return data
        })
        return cb(null, classesData)
      })
      .catch(err => cb(err))
  }
}

module.exports = userServices
