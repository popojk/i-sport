const crypto = require('crypto')
const { ulid } = require('ulid')
const { decryptTradeInfo } = require('../helpers/payment-helpers')
const { Order, UserPlan, Plan } = require('../models')
const helpers = require('../_helpers')

const orderServices = {
  postOrder: (req, cb) => {
    try {
      const { Amt, planId, planName, storeId } = req.body
      const URL = process.env.URL
      const HashKey = process.env.NEWPAY_HASHKEY
      const HashIV = process.env.NEWPAY_HASHIV
      const MerchantId = process.env.NEWPAY_MERCHANT_ID
      const RespondType = 'JSON'
      const TimeStamp = new Date().getTime()
      const Version = '2.0'
      const MerchantOrderNo = ulid()
      // const ReturnURL = 'https://isport-omega.vercel.app/find'
      const NotifyURL = `${URL}/api/orders/newpaycallback`
      const ClientBackURL = `https://isport-omega.vercel.app/find/${storeId}`

      const results = []
      results.push(`MerchantID=${MerchantId}`)
      results.push(`RespondType=${RespondType}`)
      results.push(`TimeStamp=${TimeStamp}`)
      results.push(`Version=${Version}`)
      results.push(`MerchantOrderNo=${MerchantOrderNo}`)
      results.push(`Amt=${Amt}`)
      results.push(`ItemDesc=storeId:${storeId}&planId:${planId}&${planName}`)
      // results.push(`ReturnURL=${ReturnURL}`)
      results.push(`NotifyURL=${NotifyURL}`)
      results.push(`ClientBackURL=${ClientBackURL}`)

      const encryptParams = crypto.createCipheriv('aes256', HashKey, HashIV)
      const result = encryptParams.update(results.join('&'), 'utf-8', 'hex')
      const aes256result = result + encryptParams.final('hex')
      const sha = crypto.createHash('sha256')
      const sha256keychain = `HashKey=${HashKey}&` + aes256result + `&HashIV=${HashIV}`
      const sha256result = sha.update(sha256keychain).digest('hex').toUpperCase()
      return Order.create({
        tradeInfo: aes256result,
        orderNo: MerchantOrderNo,
        userId: helpers.getUser(req).id,
        planId,
        storeId
      })
        .then(order => {
          return cb(null, {
            MerchantID: MerchantId,
            TradeInfo: aes256result,
            TradeSha: sha256result,
            Version
          })
        })
        .catch(err => cb(err))
    } catch (err) {
      cb(err)
    }
  },
  newpayCallBack: (req, cb) => {
    try {
      const data = JSON.parse(decryptTradeInfo(req.body.TradeInfo))
      const result = data.Result

      return Order.findOne({
        where: { orderNo: result.MerchantOrderNo }
      })
        .then(order => {
          if (!order) throw new Error('訂單號碼不存在')
          // build user plan if transaction status was success
          if (data.Status === 'SUCCESS') {
            return Plan.findByPk(order.planId)
              .then(plan => {
                let date = new Date()
                return UserPlan.create({
                  userId: order.userId,
                  planId: order.planId,
                  storeId: order.storeId,
                  amountLeft: plan.planType === '次數' ? plan.planAmount : null,
                  expireDate: plan.planType === '天數' ? date.setDate(date.getDate() + plan.planAmount) : null
                })
                  .then(userPlan => {
                    console.log(userPlan)
                  })
                  .catch(err => cb(err))
              })
              .then(() => {
                return cb(null, '購買成功')
              })
              .catch(err => cb(err))
            // return failure message if transaction failed
          } else {
            return cb(null, '交易失敗')
          }
        })
        .catch(err => cb(err))
    } catch (err) {
      return cb(err)
    }
  }
}

module.exports = orderServices
