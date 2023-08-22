import { RouteBase } from "../../bases/route.base";
import { ClassRoute } from "./modules/class";

export class ApiRoute extends RouteBase {

  private classRoute = new ClassRoute();

  constructor() {
    super();
  }

  protected registerRoute(): void {
    this.router.use('/classes', this.classRoute.router)
  }

}