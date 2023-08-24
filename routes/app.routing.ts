import { RouteBase } from "../bases/route.base";
import { ApiRoute } from "./apis/api.routing";

export class AppRoute extends RouteBase {

  private apiRoute: ApiRoute;

  constructor() {
    super();
    this.apiRoute = new ApiRoute();
    this.registerRoute();
  }

  protected registerRoute(): void {
    this.router.use('/api', this.apiRoute.router);
  }
}


