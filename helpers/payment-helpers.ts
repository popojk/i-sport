import { ulid } from 'ulid';
import crypto from 'crypto';
const HashKey = process.env.NEWPAY_HASHKEY as string;
const HashIV = process.env.NEWPAY_HASHIV as string;
const MerchantId = process.env.NEWPAY_MERCHANT_ID;
const RespondType = 'JSON';
const TimeStamp = new Date().getTime();
const Version = '2.0';
const MerchantOrderNo = ulid();

export function decryptTradeInfo(TradeInfo: string) {
  const decrypt = crypto.createDecipheriv('aes256', HashKey, HashIV);
  decrypt.setAutoPadding(false);
  const text = decrypt.update(TradeInfo, 'hex', 'utf8');
  const plainText = text + decrypt.final('utf8');
  const result = plainText.replace(/[\x00-\x20]+/g, '');
  return result;
}

