import { authenticated, authenticatedUser } from '../../../middleware/api-auth';
import OrderController from '../../../controllers/apis/order-controller';
import { RouteBase } from '../../../bases/route.base';

export class OrderRoute extends RouteBase {

  private orderController: OrderController;

  constructor() {
    super();
    this.orderController = new OrderController();
    this.registerRoute();
  }

  protected registerRoute(): void {
    this.router.post('/', authenticated, authenticatedUser, this.orderController.postOrder);
    this.router.post('/newpaycallback', this.orderController.newpayCallBack);
  }
}
