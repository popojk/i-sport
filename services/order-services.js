const crypto = require('crypto')
const { ulid } = require('ulid')
const { decryptTradeInfo } = require('../helpers/payment-helpers')

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
      const ReturnURL = 'https://isport-omega.vercel.app/find'
      const NotifyURL = `${URL}/api/orders/newpaycallback`

      const results = []
      results.push(`MerchantID=${MerchantId}`)
      results.push(`RespondType=${RespondType}`)
      results.push(`TimeStamp=${TimeStamp}`)
      results.push(`Version=${Version}`)
      results.push(`MerchantOrderNo=${MerchantOrderNo}`)
      results.push(`Amt=${Amt}`)
      results.push(`ItemDesc=storeId:${storeId}&planId:${planId}&${planName}`)
      results.push(`ReturnURL=${ReturnURL}`)
      results.push(`NotifyURL=${NotifyURL}`)

      const encryptParams = crypto.createCipheriv('aes256', HashKey, HashIV)
      const result = encryptParams.update(results.join('&'), 'utf-8', 'hex')
      const aes256result = result + encryptParams.final('hex')
      const sha = crypto.createHash('sha256')
      const sha256keychain = `HashKey=${HashKey}&` + aes256result + `&HashIV=${HashIV}`
      const sha256result = sha.update(sha256keychain).digest('hex').toUpperCase()
      return cb(null, {
        MerchantID: MerchantId,
        TradeInfo: aes256result,
        TradeSha: sha256result,
        Version
      })
    } catch (err) {
      cb(err)
    }
  },
  newpayCallBack: (req, cb) => {
    try {
      console.log(req)
      console.log(req.body)
      const data = decryptTradeInfo(req.body.TradeInfo)
      return cb(null, data)
    } catch (err) {
      return cb(err)
    }
  }
}

module.exports = orderServices
