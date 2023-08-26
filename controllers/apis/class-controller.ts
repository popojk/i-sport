import { Request, Response, NextFunction } from "express";
import ClassServices from '../../services/class-services';

export default class ClassController {

  private classServices = new ClassServices();

  public postClass = (req: Request, res: Response, next: NextFunction) => {
    this.classServices.postClass(req, (err: any, data?: string) => err ? next(err) : res.json(data));
  }
}
