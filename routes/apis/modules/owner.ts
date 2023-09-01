import { RouteBase } from "../../../bases/route.base";
import OwnerController from '../../../controllers/apis/owner-controller';
import { authenticated, authenticatedOwner } from '../../../middleware/api-auth';
const upload = require('../../../middleware/multer');



export class OwnerRoute extends RouteBase {

  private ownerController: OwnerController;

  constructor() {
    super();
    this.ownerController = new OwnerController();
    this.registerRoute();
  }

  protected registerRoute(): void {
    this.router.post('/users', this.ownerController.signUp);
    this.router.get('/users/account', authenticated, authenticatedOwner, this.ownerController.getOwner);
    this.router.put('/users/account', authenticated, authenticatedOwner, this.ownerController.putAccount);
    this.router.put('/users/password', authenticated, authenticatedOwner, this.ownerController.putPassword);
    this.router.get('/stores', authenticated, authenticatedOwner, this.ownerController.getStores);
    this.router.post('/stores', authenticated, authenticatedOwner, upload.single('photo'), this.ownerController.postStore);
    this.router.put('/stores/:store_id', authenticated, authenticatedOwner, upload.single('photo'), this.ownerController.putStore);
    this.router.get('/stores/:store_id', authenticated, authenticatedOwner, this.ownerController.getStore);
    this.router.delete('/stores/:store_id', authenticated, authenticatedOwner, this.ownerController.deleteStore);
    this.router.get('/stores/:store_id/classes', authenticated, authenticatedOwner, this.ownerController.getClassSchedules);
    this.router.post('/stores/:store_id/classes', authenticated, authenticatedOwner, this.ownerController.postClassSchedules);
    this.router.put('/classes/:schedule_id', authenticated, authenticatedOwner, this.ownerController.putClassSchedule);
    this.router.delete('/classes/:schedule_id', authenticated, authenticatedOwner, this.ownerController.deleteClassSchedule);
    this.router.get('/stores/:store_id/plans', authenticated, authenticatedOwner, this.ownerController.getStorePlans);
    this.router.post('/stores/:store_id/plans', authenticated, authenticatedOwner, this.ownerController.postStorePlans);
    this.router.put('/plans/:plan_id', authenticated, authenticatedOwner, this.ownerController.putStorePlan);
    this.router.delete('/plans/:plan_id', authenticated, authenticatedOwner, this.ownerController.deleteStorePlan);
    this.router.get('/stores/:store_id/reviews', authenticated, authenticatedOwner, this.ownerController.getStoreReviews);
  }
}


