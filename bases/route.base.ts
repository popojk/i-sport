import { Router } from 'express';

export abstract class RouteBase {
  public router = Router();

  contructor() {
    this.initial();
  }

  protected initial(): void {
    this.registerRoute();
  }

  protected abstract registerRoute(): void;
}