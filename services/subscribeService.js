// 載入所需套件
const { Subscribe } = require('../models')
const { Op } = require('sequelize')
const helpers = require('../_helpers')
const ReqError = require('../helpers/ReqError')


const subscribeService = {
  postSubscribe: async (req, res, callback) => {
    const subscribedId = helpers.getUser(req).id
    const subscriberId = req.params.id

    //使用者不能訂閱自己
    if (subscribedId === Number(subscriberId)) {
      throw new ReqError('不能訂閱自己')
    }
    //不能重複訂閱他人
    const subscription = await Subscribe.findOne({ where: { [Op.and]: [{ subscribedId }, { subscriberId }] } })

    if (subscription) {
      throw new ReqError('不能重複訂閱')
    } else {
      await Subscribe.create({
        subscribedId,
        subscriberId
      })
      return callback({ status: 'success', message: '成功訂閱' })
    }
  }
}

// subscribeController exports
module.exports = subscribeService