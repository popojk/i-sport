import { RouteBase } from '../../../bases/route.base';
import ClassController from '../../../controllers/apis/class-controller';

export class ClassRoute extends RouteBase {

  private classController = new ClassController();
  constructor() {
    super();
  }

  protected registerRoute(): void {
    this.router.post('/:class_id', this.classController.postClass);
  }

}
