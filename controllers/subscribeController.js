// 載入所需套件
const subscribeService = require('../services/subscribeService')

const subscribeController = {
  postSubscribe: async (req, res) => {
    try {
      await subscribeService.postSubscribe(req, res, data => {
        return res.json(data)
      })
    } catch (err) {
      return res.status(400).json({ status: err.name, message: err.message })
    }
  },

  deleteSubscribe: async (req, res) => {
    subscribeService.deleteSubscribe(req, res, data => {
      return res.json(data)
    })
  }
}

// subscribeService exports
module.exports = subscribeController