// 載入所需套件
const { Tweet, User, Notification } = require('../models')
const helpers = require('../_helpers')
const sequelize = require('sequelize')
const ReqError = require('../helpers/ReqError')

const tweetService = {
  postTweet: async (req, res, callback) => {
    const { description } = req.body
    //確認發文欄是否有填寫
    if (!description) {
      throw new ReqError('內容不可空白')
    } else {
      const tweet = await Tweet.create({
        description,
        UserId: helpers.getUser(req).id
      })
      const subscribers = await User.findAll({
        where: { id: helpers.getUser(req).id },
        raw: true,
        nest: true,
        include: [{ model: User, as: 'Subscribers', attributes: ['id'] }],
        attributes: [] 
      })
      
      Promise.all(
        Array.from(
          { length: subscribers.length },
          (_, i) => Notification.create({ TweetId: tweet.id, subscriberId: subscribers[i].Subscribers.id })
        )
      )
      return callback({ status: 'success', message: '成功發文' })
    }
  },

  getTweets: async (req, res, callback) => {
    const currentUserId = helpers.getUser(req).id
    //撈出tweet資料，並取得關聯User的資料
    const tweets = await Tweet.findAll({
      raw: true,
      nest: true,
      attributes: [
        'id',
        'description',
        'createdAt',
        [sequelize.literal(`(select count(TweetId) from Likes where TweetId = Tweet.id)`), 'likeCounts'],
        [sequelize.literal(`(select count(TweetId) from Replies where TweetId = Tweet.id)`), 'commentCounts'],
        [sequelize.literal(`exists(select 1 from Likes where UserId = ${currentUserId} and TweetId = Tweet.id)`), 'isLiked']
      ],
      include: [{
        model: User, attributes: ['id', 'account', 'name', 'avatar']
      }],
      order: [['createdAt', 'DESC']]
    })
    return callback(tweets)
  },

  getTweet: async (req, res, callback) => {
    const currentUserId = helpers.getUser(req).id
    //撈出特定:tweet_id的資料，並取得關聯User的資料
    const tweet = await Tweet.findByPk(req.params.tweet_id,
      {
        raw: true,
        nest: true,
        attributes: [
          'id',
          'description',
          'createdAt',
          [sequelize.literal(`(select count(TweetId) from Likes where TweetId = Tweet.id)`), 'likeCounts'],
          [sequelize.literal(`(select count(TweetId) from Replies where TweetId = Tweet.id)`), 'commentCounts'],
          [sequelize.literal(`exists(select 1 from Likes where UserId = ${currentUserId} and TweetId = Tweet.id)`), 'isLiked']
        ],
        include: [{ model: User, attributes: ['id', 'account', 'name', 'avatar'] }],
      })
    return callback(tweet)
  },
}

// tweetController exports
module.exports = tweetService