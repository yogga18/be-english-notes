// Create Abstrac Class
import { Router } from 'express';
import IRouter from './InterfaceRouter';

abstract class BaseRoute implements IRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  abstract routers(): void;
}

export default BaseRoute;
