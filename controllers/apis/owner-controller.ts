import { SignInData, SignUpData, UserAccountData } from '../../interfaces/user-interface';
import OwnerServices from '../../services/owner-services';
import { Request, Response, NextFunction } from 'express';
import { StoreInstance } from '../../interfaces/store-interface';
import { ClassScheduleInstance } from '../../interfaces/class-interface';
import { PlanInstance } from '../../interfaces/plan-interface';
import { ReviewInstance } from '../../interfaces/review-interface';

export default class OwnerController {

  private ownerServices = new OwnerServices();

  public signIn = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.signIn(req, (err: any, data?: SignInData) => err ? next(err) : res.json(data));
  }

  public signUp = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.signUp(req, (err: any, data?: SignUpData) => err ? next(err) : res.json(data));
  }

  public getOwner = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.getOwner(req, (err: any, data?: UserAccountData) => err ? next(err) : res.json(data));
  }

  public putAccount = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.putAccount(req, (err: any, data?: string) => err ? next(err) : res.json(data));
  }

  public putPassword = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.putPassword(req, (err: any, data?: string) => err ? next(err) : res.json(data));
  }

  public getStores = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.getStores(req, (err, data?: StoreInstance[]) => err ? next(err) : res.json(data));
  }

  public postStore = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.postStore(req, (err: any, data?: { id: number }) => err ? next(err) : res.json(data));
  }

  public putStore = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.putStore(req, (err: any, data?: string) => err ? next(err) : res.json(data));
  }

  public getStore = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.getStore(req, (err: any, data?: StoreInstance) => err ? next(err) : res.json(data));
  }

  public deleteStore = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.deleteStore(req, (err: any, data?: string) => err ? next(err) : res.json(data));
  }

  public getClassSchedules = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.getClassSchedules(req, (err: any, data?: ClassScheduleInstance[]) => err ? next(err) : res.json(data));
  }

  public postClassSchedules = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.postClassSchedules(req, (err: any, data?: { id?: number }) => err ? next(err) : res.json(data));
  }

  public putClassSchedule = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.putClassSchedule(req, (err: any, data?: string) => err ? next(err) : res.json(data));
  }

  public deleteClassSchedule = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.deleteClassSchedule(req, (err: any, data?: string) => err ? next(err) : res.json(data));
  }

  public getStorePlans = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.getStorePlans(req, (err: any, data?: PlanInstance[]) => err ? next(err) : res.json(data));
  }

  public postStorePlans = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.postStorePlans(req, (err: any, data?: { id?: number }) => err ? next(err) : res.json(data));
  }

  public putStorePlan = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.putStorePlan(req, (err: any, data?: string) => err ? next(err) : res.json(data));
  }

  public deleteStorePlan = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.deleteStorePlan(req, (err: any, data?: string) => err ? next(err) : res.json(data));
  }
  public getStoreReviews = (req: Request, res: Response, next: NextFunction) => {
    this.ownerServices.getStoreReviews(req, (err: any, data?: ReviewInstance[]) => err ? next(err) : res.json(data));
  }
}

