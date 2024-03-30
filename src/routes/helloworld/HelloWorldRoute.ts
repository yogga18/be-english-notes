import TestingController from '../../contollers/helloworld/HelloWorldController';
import { rateLimitMiddleware } from '../../middlewares/RateLimitMiddleware';
import BaseRoute from '../BaseRoute';

class HelloWorldRoute extends BaseRoute {
  public routers(): void {
    this.router.get('/hello', rateLimitMiddleware, TestingController.index);
  }
}

export default new HelloWorldRoute().router;
