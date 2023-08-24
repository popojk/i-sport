import { Request, Response, NextFunction } from 'express';
import UserServices from '../../services/user-services';
import { SignUpData, SignInData } from '../../interfaces/user-interface';

export default class UserConroller {

  private userServices: UserServices;

  constructor() {
    this.userServices = new UserServices();
  }

  public signIn = (req: Request, res: Response, next: NextFunction) => {
    this.userServices.signIn(req, (err: any, data: SignInData) => err ? next(err) : res.json(data));
  }

   public signUp = (req: Request, res: Response, next: NextFunction) => {
    this.userServices.signUp(req, (err: any, data: SignUpData) => err ? next(err) : res.json(data));
  }
/* getUser: (req, res, next) => {
  userServices.getUser(req, (err, data) => err ? next(err) : res.json(data))
},
  putAccount: (req, res, next) => {
    userServices.putAccount(req, (err, data) => err ? next(err) : res.json(data))
  },
    putPassword: (req, res, next) => {
      userServices.putPassword(req, (err, data) => err ? next(err) : res.json(data))
    },
      getUserPlans: (req, res, next) => {
        userServices.getUserPlans(req, (err, data) => err ? next(err) : res.json(data))
      },
        getUserCollections: (req, res, next) => {
          userServices.getUserCollections(req, (err, data) => err ? next(err) : res.json(data))
        },
          getUserReservations: (req, res, next) => {
            userServices.getUserReservations(req, (err, data) => err ? next(err) : res.json(data))
          } */

}