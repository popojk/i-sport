import { RouteBase } from '../../../bases/route.base';
import ClassController from '../../../controllers/apis/class-controller';

export class ClassRoute extends RouteBase{

  private classController: ClassController;

  constructor() {
    super();
    this.classController = new ClassController();
    this.registerRoute();
  }

  protected registerRoute(): void {
    this.router.post('/:class_id', this.classController.postClass);
  }

}
