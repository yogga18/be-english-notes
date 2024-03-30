import compression from 'compression';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { config as dotenv } from 'dotenv';
import HelloWorldRoute from './routes/helloworld/HelloWorldRoute';
import AuthRoutes from './routes/Auth/AuthRoutes';
import { swaggerSpec, swaggerui } from './documentation/swaggerConfig';
import NotesRoutes from './routes/Notes/NotesRoutes';
// import { swaggerSpec, swaggerui } from './documentation/swaggerConfig';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerSpec));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan('dev')); // morgan for logging request
    this.app.use(compression()); // compress all request response
    this.app.use(helmet()); // secure your app by setting various HTTP headers
    this.app.use(cors());
    dotenv();
  }

  protected routes(): void {
    this.app.use('/api/v1/testing', HelloWorldRoute);
    this.app.use('/api/v1/auth', AuthRoutes);
    this.app.use('/api/v1/notes', NotesRoutes);
  }
}

// const PORT = process.env.PORT || 8001;
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8001;

const app = new App().app;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
