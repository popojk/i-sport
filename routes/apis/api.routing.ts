import { RouteBase } from "../../bases/route.base";
import { ClassRoute } from "./modules/class";
import { UserRoute } from "./modules/user";
import UserController from "../../controllers/apis/user-controller";
import { apiErrorHandler } from '../../middleware/error-handler';
import { authenticated, authenticatedUser } from "../../middleware/api-auth";
import { Router } from 'express';
import { StoreRoute } from "./modules/store";
import { ReservationRoute } from "./modules/reservation";
const passport = require('../../config/passport');

export class ApiRoute extends RouteBase {

  private classRoute: ClassRoute;
  private userRoute: UserRoute;
  private storeRoute: StoreRoute;
  private reservationRoute: ReservationRoute;
  private userController: UserController;

  constructor() {
    super();
    this.classRoute = new ClassRoute();
    this.userRoute = new UserRoute();
    this.storeRoute = new  StoreRoute();
    this.reservationRoute = new ReservationRoute();
    this.userController = new UserController();
    this.registerRoute();
  }

  protected registerRoute(): void {
    this.router.post('/signin', passport.authenticate('local', { session: false }), authenticatedUser, this.userController.signIn);
    this.router.use('/users', this.userRoute.router);
    this.router.use('/classes', this.classRoute.router);
    this.router.use('/stores', authenticated, authenticatedUser, this.storeRoute.router);
    this.router.use('/reservations', authenticated, authenticatedUser, this.reservationRoute.router);
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
router.post('/owner/signin', passport.authenticate('local', { session: false }), authenticatedOwner, ownerController.signIn)
router.use('/owner', owner)
router.use('/users', user)

router.use('/classes', authenticated, authenticatedUser, cls)

router.use('/orders', order)

 */