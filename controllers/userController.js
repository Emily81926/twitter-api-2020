// 載入所需套件
const userService = require('../services/userService')

const userController = {
  signUp: (req, res) => {
    userService.signUp(req, res, data => {
      return res.json(data)
    })
  },

  signIn: (req, res) => {
    userService.signIn(req, res, data => {
      return res.status(401).json(data)
    })
  },
}

// userService exports
module.exports = userController