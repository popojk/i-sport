const express = require('express')
const router = express.Router()
const classController = require('../../../controllers/apis/class-controller')

router.post('/:class_id', classController.postClass)

module.exports = router
