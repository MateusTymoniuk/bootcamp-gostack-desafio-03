import express from 'express';
import * as Sentry from '@sentry/node';
import path from 'path';
import sentryConfig from './config/sentry';
import 'express-async-errors';
import routes from './routes';

import './database';
import errorMiddleware from './app/middlewares/error';

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(errorMiddleware);
  }
}

export default new App().server;
