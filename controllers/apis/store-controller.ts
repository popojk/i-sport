import StoreServices from '../../services/store-services';
import { Request, Response, NextFunction } from 'express';
import { StoreInstance } from '../../interfaces/store-interface';
import { ClassInstance } from '../../interfaces/class-interface';
import { PlanInstance } from '../../interfaces/plan-interface';
import { ReviewInstance } from '../../interfaces/review-interface';

export default class StoreController {

  private storeServices = new StoreServices();

  public getStores = (req: Request, res: Response, next: NextFunction) => {
    this.storeServices.getStores(req, (err: any, data?: StoreInstance[]) => err ? next(err) : res.json(data));
  }

  public getStore = (req: Request, res: Response, next: NextFunction) => {
    this.storeServices.getStore(req, (err: any, data?: StoreInstance) => err ? next(err) : res.json(data));
  }

  public getClasses = (req: Request, res: Response, next: NextFunction) => {
    this.storeServices.getClasses(req, (err: any, data?: ClassInstance[]) => err ? next(err) : res.json(data));
  }

  public getPlans = (req: Request, res: Response, next: NextFunction) => {
    this.storeServices.getPlans(req, (err: any, data?: PlanInstance[]) => err ? next(err) : res.json(data));
  }

  public getReviews = (req: Request, res: Response, next: NextFunction) => {
    this.storeServices.getReviews(req, (err: any, data?: ReviewInstance[]) => err ? next(err) : res.json(data));
  }

  public postReview = (req: Request, res: Response, next: NextFunction) => {
    this.storeServices.postReview(req, (err: any, data?: string) => err ? next(err) : res.json(data));
  }

  public postLike = (req: Request, res: Response, next: NextFunction) => {
    this.storeServices.postLike(req, (err: any, data?: string) => err ? next(err) : res.json(data));
  }

  public postUnlike = (req: Request, res: Response, next: NextFunction) => {
    this.storeServices.postUnlike(req, (err: any, data?: string) => err ? next(err) : res.json(data));
  }
}
