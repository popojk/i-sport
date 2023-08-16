const { Store, ClassSchedule, Class, Plan, Review, Collection } = require('../models')
const helpers = require('../_helpers')
const sequelize = require('sequelize')
const { paginate } = require('../helpers/paginate-helpers')
const { classDataHelper, buildClassData } = require('../helpers/class-helpers')
const { getCurrentSevenDays, getReviewCreatedDate } = require('../helpers/date-helpers')

const storeServices = {
  getStores: (req, cb) => {
    const userId = helpers.getUser(req).id
    return Store.findAll({
      raw: true,
      attributes: ['id', 'storeName', 'photo', 'address', 'introduction', 'lat', 'lng',
        [sequelize.literal('(SELECT COUNT (*) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'reviewCounts'],
        [sequelize.literal('(SELECT ROUND(AVG (rating), 1) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'rating'],
        [sequelize.literal(`EXISTS(SELECT 1 FROM Collections WHERE Collections.store_id = Store.id AND Collections.user_id = ${userId})`), 'isLiked']
      ]
    })
      .then(stores => {
        const data = stores.map(store => {
          store.isLiked = store.isLiked === 1
          return store
        })
        return cb(null, data)
      })
      .catch(err => cb(err))
  },
  getStore: (req, cb) => {
    const userId = helpers.getUser(req).id
    return Store.findByPk(req.params.store_id, {
      raw: true,
      attributes: ['id', 'storeName', 'photo', 'address', 'introduction', 'phone', 'email', 'lat', 'lng',
        [sequelize.literal('(SELECT COUNT (*) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'reviewCounts'],
        [sequelize.literal('(SELECT ROUND(AVG (rating), 1) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'rating'],
        [sequelize.literal(`EXISTS(SELECT 1 FROM Collections WHERE Collections.store_id = Store.id AND Collections.user_id = ${userId})`), 'isLiked']
      ]
    })
      .then(store => {
        if (!store) throw new Error('場館不存在')
        store.isLiked = store.isLiked === 1
        return cb(null, store)
      })
      .catch(err => cb(err))
  },
  getClasses: (req, cb) => {
    const userId = helpers.getUser(req).id
    // get dates of the current 7 days
    const currentSevenDates = getCurrentSevenDays()

    return Promise.all([
      // get all class schedules
      ClassSchedule.findAll({
        where: { storeId: req.params.store_id },
        raw: true
      }),
      // get the existing classes in the current 7 days
      Class.findAll({
        where: {
          storeId: req.params.store_id,
          date: currentSevenDates
        },
        attributes: ['id', 'date', 'startDateTime', 'classScheduleId',
          [sequelize.literal('(SELECT store_name FROM Stores WHERE Stores.id = Class.store_id)'), 'storeName'],
          [sequelize.literal('(SELECT start_time FROM Class_schedules WHERE Class_schedules.id = Class.class_schedule_id)'), 'startTime'],
          [sequelize.literal('(SELECT end_time FROM Class_schedules WHERE Class_schedules.id = Class.class_schedule_id)'), 'endTime'],
          [sequelize.literal('(SELECT week_day FROM Class_schedules WHERE Class_schedules.id = Class.class_schedule_id)'), 'weekDay'],
          [sequelize.literal(`EXISTS(SELECT 1 FROM Reservations WHERE Reservations.class_id = Class.id AND Reservations.user_id = ${userId})`), 'isReserved']
        ],
        raw: true
      })
    ])
      // check and build classes in the current 7 days
      .then(([classSchedules, classes]) => {
        // if there is no class build, build all classes in the current 7 days
        if (classes.length === 0) {
          const classesData = classSchedules.map(schedule => {
            return buildClassData(schedule, currentSevenDates)
          })
          return Class.bulkCreate(classesData).then(() => classes)
          // if there are existing classes, scan classSchedules and build class
        } else {
          // if all classes were built, return directly
          if (classSchedules.length === classes.length) {
            return Promise.resolve(classes)
            // get schedule id from current classes, and build class if there are missing classes
          } else {
            // get schedule id from current classes
            const classScheduleIds = classes.map(cls => {
              return cls.classScheduleId
            })
            // scan all classSchedules, and build class if current classes has missing classes
            const classesData = []
            classSchedules.forEach(schedule => {
              if (!classScheduleIds.includes(schedule.id)) {
                classesData.push(buildClassData(schedule, currentSevenDates))
              }
            })
            return Class.bulkCreate(classesData)
          }
        }
      })
      // get all classes in the current 7 days
      .then(() => {
        return Class.findAll({
          where: {
            storeId: req.params.store_id,
            date: currentSevenDates
          },
          attributes: ['id', 'date', 'startDateTime', 'classScheduleId',
            [sequelize.literal('(SELECT store_name FROM Stores WHERE Stores.id = Class.store_id)'), 'StoreName'],
            [sequelize.literal('(SELECT class_name FROM Class_schedules WHERE Class_schedules.id = Class.class_schedule_id)'), 'className'],
            [sequelize.literal('(SELECT start_time FROM Class_schedules WHERE Class_schedules.id = Class.class_schedule_id)'), 'startTime'],
            [sequelize.literal('(SELECT end_time FROM Class_schedules WHERE Class_schedules.id = Class.class_schedule_id)'), 'endTime'],
            [sequelize.literal('(SELECT week_day FROM Class_schedules WHERE Class_schedules.id = Class.class_schedule_id)'), 'weekDay'],
            [sequelize.literal(`EXISTS(SELECT 1 FROM Reservations WHERE Reservations.class_id = Class.id AND Reservations.user_id = ${userId})`), 'isReserved']
          ],
          raw: true,
          order: [
            ['date', 'ASC']
          ]
        })
      })
      // return classes to frontend
      .then(classes => {
        const classesData = classDataHelper(classes)
        return cb(null, classesData)
      })
      .catch(err => cb(err))
  },
  getPlans: (req, cb) => {
    return Plan.findAll({
      where: { store_id: req.params.store_id },
      raw: true,
      attributes: ['id', 'planName', 'price']
    })
      .then(plans => {
        if (plans.length === 0) throw new Error('商家無方案')
        return cb(null, plans)
      })
      .catch(err => cb(err))
  },
  getReviews: (req, cb) => {
    try {
      const page = req.query.page
      const pageSize = req.query.pageSize
      if (!page || !pageSize) throw new Error('請提供page及pageSize')
      return Review.findAll({
        where: { storeId: req.params.store_id },
        ...paginate({ page, pageSize }),
        raw: true,
        attributes: ['id', 'createdAt', 'rating', 'content',
          [sequelize.literal('(SELECT avatar FROM Users WHERE Users.id = Review.user_id)'), 'avatar'],
          [sequelize.literal('(SELECT nickname FROM Users WHERE Users.id = Review.user_id)'), 'nickname']
        ],
        order: [['id', 'DESC']]
      })
        .then(reviews => {
          if (reviews.length === 0) throw new Error('商家無評價')
          const reviewsData = reviews.map(review => {
            review.createdAt = getReviewCreatedDate(review)
            return review
          })
          return cb(null, reviewsData)
        })
        .catch(err => cb(err))
    } catch (err) {
      cb(err)
    }
  },
  postReview: (req, cb) => {
    try {
      const { content, rating } = req.body
      if (!content || !rating) throw new Error('必須輸入評價或評論')
      if (content && content.length > 100) throw new Error('評論不可超過100字元')
      return Store.findByPk(req.params.store_id)
        .then(store => {
          if (!store) throw new Error('場館不存在')
          return Review.create({
            rating,
            content,
            storeId: req.params.store_id,
            userId: helpers.getUser(req).id
          })
        })
        .then(() => {
          return cb(null, '評價新增成功')
        })
        .catch(err => cb(err))
    } catch (err) {
      return cb(err)
    }
  },
  postLike: (req, cb) => {
    return Store.findByPk(req.params.store_id)
      .then(store => {
        if (!store) throw new Error('場館不存在')
        return Collection.create({
          userId: helpers.getUser(req).id,
          storeId: req.params.store_id
        })
      })
      .then(() => {
        return cb(null, '成功新增我的場館')
      })
      .catch(err => cb(err))
  },
  postUnlike: (req, cb) => {
    return Store.findByPk(req.params.store_id)
      .then(store => {
        if (!store) throw new Error('場館不存在')
        return Collection.findOne({
          where: {
            userId: helpers.getUser(req).id,
            storeId: req.params.store_id
          }
        })
      })
      .then(collection => {
        return collection.destroy()
          .then(() => {
            return cb(null, '移除成功')
          })
          .catch(err => cb(err))
      })
      .catch(err => cb(err))
  }
}

module.exports = storeServices
