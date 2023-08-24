import { RouteBase } from '../../../bases/route.base';
const upload = require('../../../middleware/multer')
import UserController from '../../../controllers/apis/user-controller';
const { authenticated, authenticatedUser } = require('../../../middleware/api-auth')

export class UserRoute extends RouteBase{

  private userControllers: UserController;

  constructor() {
    super();
    this.userControllers = new UserController();
    this.registerRoute();
  }

  protected registerRoute(): void {
    this.router.post('/', this.userControllers.signUp);
  }

}

/* router.post('/', userController.signUp)
router.get('/account', authenticated, authenticatedUser, userController.getUser)
router.put('/account', authenticated, authenticatedUser, upload.single('avatar'), userController.putAccount)
router.put('/password', authenticated, authenticatedUser, userController.putPassword)
router.get('/plans', authenticated, authenticatedUser, userController.getUserPlans)
router.get('/like_stores', authenticated, authenticatedUser, userController.getUserCollections)
router.get('/reservations', authenticated, authenticatedUser, userController.getUserReservations) */
