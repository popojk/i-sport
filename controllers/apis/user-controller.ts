import { Request, Response, NextFunction } from 'express';
import UserServices from '../../services/user-services';
import { UserAccountData, UserInstance, SignUpData, SignInData, UserPlanInstance, StoreWithUserPlanInstance, CollectionInstance, ReservationClass } from '../../interfaces/user-interface';
import { ReturnMessage } from '../../interfaces/message-interface';

export default class UserConroller {

  private userServices: UserServices;

  constructor() {
    this.userServices = new UserServices();
  }

  public signIn = (req: Request, res: Response, next: NextFunction) => {
    this.userServices.signIn(req, (err: any, data?: SignInData) => err ? next(err) : res.json(data));
  }

  public signUp = (req: Request, res: Response, next: NextFunction) => {
    this.userServices.signUp(req, (err: any, data?: SignUpData) => err ? next(err) : res.json(data));
  }

  public getUser = (req: Request, res: Response, next: NextFunction) => {
    this.userServices.getUser(req, (err: any, data?: UserAccountData) => err ? next(err) : res.json(data));
  }

  public putAccount = (req: Request, res: Response, next: NextFunction) => {
    this.userServices.putAccount(req, (err: any, data?: ReturnMessage) => err ? next(err) : res.json(data));
  }

  public putPassword = (req: Request, res: Response, next: NextFunction) => {
    this.userServices.putPassword(req, (err: any, data?: ReturnMessage) => err ? next(err) : res.json(data));
  }

  public getUserPlans = (req: Request, res: Response, next: NextFunction) => {
    this.userServices.getUserPlans(req, (err: any, data?: UserPlanInstance[] | StoreWithUserPlanInstance[]) => err ? next(err) : res.json(data));
  }

  public getUserCollections = (req: Request, res: Response, next: NextFunction) => {
    this.userServices.getUserCollections(req, (err: any, data?: CollectionInstance[]) => err ? next(err) : res.json(data));
  }

  public getUserReservations = (req: Request, res: Response, next: NextFunction) => {
    this.userServices.getUserReservations(req, (err: any, data?: ReservationClass[]) => err ? next(err) : res.json(data));
  }

}