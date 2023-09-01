import OrderServices from '../../services/order-services';
import { Request, Response, NextFunction } from 'express';
import { OrderInfoResponse } from '../../interfaces/order-interface';

export default class OrderController {

  private orderServices = new OrderServices();

  public postOrder = (req: Request, res: Response, next: NextFunction) => {
    this.orderServices.postOrder(req, (err: any, data?: OrderInfoResponse) => err ? next(err) : res.json(data));
  }
  
  public newpayCallBack = (req: Request, res: Response, next: NextFunction) => {
    this.orderServices.newpayCallBack(req, (err: any, data?: string) => err ? next(err) : res.json(data));
  }
}
