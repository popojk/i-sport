import { RouteBase } from "../../../bases/route.base";
import { authenticated, authenticatedUser } from "../../../middleware/api-auth";
import StoreController from "../../../controllers/apis/store-controller";

export class StoreRoute extends RouteBase {

  private storeController: StoreController;

  constructor() {
    super();
    this.storeController = new StoreController();
    this.registerRoute();
  }

  protected registerRoute(): void {
    this.router.get('/', this.storeController.getStores);
    this.router.get('/:store_id', this.storeController.getStore);
    this.router.get('/:store_id/classes', this.storeController.getClasses);
    this.router.get('/:store_id/plans', this.storeController.getPlans);
    this.router.get('/:store_id/reviews', this.storeController.getReviews);
    this.router.post('/:store_id/reviews', this.storeController.postReview);
    this.router.post('/:store_id/like', this.storeController.postLike);
    this.router.post('/:store_id/unlike', this.storeController.postUnlike);
  }

}
