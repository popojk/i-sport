import { RouteBase } from '../../../bases/route.base';
const upload = require('../../../middleware/multer')
import UserController from '../../../controllers/apis/user-controller';
const { authenticated, authenticatedUser } = require('../../../middleware/api-auth')

export class UserRoute extends RouteBase{

  private userController: UserController;

  constructor() {
    super();
    this.userController = new UserController();
    this.registerRoute();
  }

  protected registerRoute(): void {
    this.router.post('/', this.userController.signUp);
    this.router.get('/account', authenticated, authenticatedUser, this.userController.getUser);
    this.router.put('/account', authenticated, authenticatedUser, upload.single('avatar'), this.userController.putAccount);
    this.router.put('/password', authenticated, authenticatedUser, this.userController.putPassword);
    this.router.get('/plans', authenticated, authenticatedUser, this.userController.getUserPlans);
    this.router.get('/like_stores', authenticated, authenticatedUser, this.userController.getUserCollections);
    this.router.get('/reservations', authenticated, authenticatedUser, this.userController.getUserReservations);
  }

}
