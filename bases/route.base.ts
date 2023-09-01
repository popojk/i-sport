import { Router } from 'express';

export abstract class RouteBase {
  public router = Router();

  protected abstract registerRoute(): void;
}