const { Store, Review } = require('../models')
const helpers = require('../_helpers')
const sequelize = require('sequelize')

const storeServices = {
  getStores: (req, cb) => {
    const userId = helpers.getUser(req).id
    return Store.findAll({
      raw: true,
      attributes: ['id', 'storeName', 'photo', 'address', 'introduction',
        [sequelize.literal('(SELECT COUNT (*) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'reviewCounts'],
        [sequelize.literal('(SELECT AVG (rating) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'rating'],
        [sequelize.literal(`EXISTS(SELECT 1 FROM Collections WHERE Collections.store_id = Store.id AND Collections.user_id = ${userId})`), 'isLiked']
      ]
    })
      .then(stores => {
        return cb(null, stores)
      })
      .catch(err => cb(err))
  },
  getStore: (req, cb) => {
    const userId = helpers.getUser(req).id
    return Store.findByPk(req.params.store_id, {
      raw: true,
      attributes: ['id', 'storeName', 'photo', 'address', 'introduction', 'phone', 'email',
        [sequelize.literal('(SELECT COUNT (*) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'reviewCounts'],
        [sequelize.literal('(SELECT AVG (rating) FROM Reviews WHERE Reviews.store_id = Store.id)'), 'rating'],
        [sequelize.literal(`EXISTS(SELECT 1 FROM Collections WHERE Collections.store_id = Store.id AND Collections.user_id = ${userId})`), 'isLiked']
      ]
    })
      .then(store => {
        if (!store) throw new Error('場館不存在')
        return cb(null, store)
      })
      .catch(err => cb(err))
  }
}

module.exports = storeServices
