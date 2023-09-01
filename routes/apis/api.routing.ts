import { RouteBase } from "../../bases/route.base";
import { ClassRoute } from "./modules/class";
import { UserRoute } from "./modules/user";
import UserController from "../../controllers/apis/user-controller";
import { apiErrorHandler } from '../../middleware/error-handler';
import { authenticated, authenticatedUser, authenticatedOwner } from "../../middleware/api-auth";
import { Router } from 'express';
import { StoreRoute } from "./modules/store";
import { ReservationRoute } from "./modules/reservation";
import { OrderRoute } from "./modules/order";
import { OwnerRoute } from "./modules/owner";
import OwnerController from "../../controllers/apis/owner-controller";
const passport = require('../../config/passport');

export class ApiRoute extends RouteBase {

  private classRoute: ClassRoute;
  private userRoute: UserRoute;
  private storeRoute: StoreRoute;
  private reservationRoute: ReservationRoute;
  private orderRoute: OrderRoute;
  private ownerRoute: OwnerRoute;
  private userController: UserController;
  private ownerController: OwnerController;

  constructor() {
    super();
    this.classRoute = new ClassRoute();
    this.userRoute = new UserRoute();
    this.storeRoute = new StoreRoute();
    this.reservationRoute = new ReservationRoute();
    this.orderRoute = new OrderRoute();
    this.ownerRoute = new OwnerRoute();
    this.userController = new UserController();
    this.ownerController = new OwnerController();
    this.registerRoute();
  }

  protected registerRoute(): void {
    this.router.post('/signin', passport.authenticate('local', { session: false }), authenticatedUser, this.userController.signIn);
    this.router.post('/owner/signin', passport.authenticate('local', { session: false }), authenticatedOwner, this.ownerController.signIn);
    this.router.use('/users', this.userRoute.router);
    this.router.use('/owner', this.ownerRoute.router);
    this.router.use('/classes', authenticated, authenticatedUser, this.classRoute.router);
    this.router.use('/stores', authenticated, authenticatedUser, this.storeRoute.router);
    this.router.use('/reservations', authenticated, authenticatedUser, this.reservationRoute.router);
    this.router.use('/orders', this.orderRoute.router);
    this.router.use('/classes', authenticated, authenticatedUser, this.classRoute.router);
    this.router.use('/', apiErrorHandler);
  }

}
/*
const express = require('express')
const router = express.Router()
const userController = require('../../controllers/apis/user-controller')
const ownerController = require('../../controllers/apis/owner-controller')
const passport = require('../../config/passport')
const { authenticated, authenticatedUser, authenticatedOwner } = require('../../middleware/api-auth')
const user = require('./modules/user')
const owner = require('./modules/owner')
const store = require('./modules/store')
const cls = require('./modules/class')
const reservation = require('./modules/reservation')
const order = require('./modules/order')

router.post('/signin', passport.authenticate('local', { session: false }), authenticatedUser, userController.signIn)

router.use('/users', user)





 */