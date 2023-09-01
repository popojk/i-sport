import { Model } from "sequelize";

export interface OrderInfoResponse {
  MerchantID: string;
  TradeInfo: string;
  TradeSha: string;
  Version: string;
}

export interface OrderInstance extends Model {
  id: number;
  tradeInfo: string;
  orderNo: string;
  userId: number;
  planId: number;
  storeId: number;
}