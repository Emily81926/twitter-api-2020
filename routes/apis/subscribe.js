// 載入所需套件
const express = require('express')
const router = express.Router()
const subscribeController = require('../../controllers/subscribeController')
const { authenticated, checkNotAdmin } = require('../../middlewares/auth')

router.post('/:id', authenticated, checkNotAdmin, subscribeController.postSubscribe)

// router exports
module.exports = router