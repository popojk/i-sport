import { Request, Response, NextFunction } from "express";
const classServices = require('../../services/class-services')

export default class ClassController {
  postClass (req: Request, res: Response, next: NextFunction) {
    classServices.postClass(req, (err: any, data: any) => err ? next(err) : res.json(data));
  }
}
