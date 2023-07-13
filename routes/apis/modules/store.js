const express = require('express')
const router = express.Router()
const storeController = require('../../../controllers/apis/store-controller')

router.get('/', storeController.getStores)
router.get('/:store_id', storeController.getStore)
router.get('/:store_id/classes', storeController.getClasses)
router.get('/:store_id/plans', storeController.getPlans)
router.get('/:store_id/reviews', storeController.getReviews)
router.post('/:store_id/reviews', storeController.postReview)
router.post('/:store_id/like', storeController.postLike)
router.post('/:store_id/unlike', storeController.postUnlike)

module.exports = router
