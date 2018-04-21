import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as path from 'path';

import GithubRouter from './routes/github';

class Server {
  public app: express.Application;
  public cors: any;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  // application config
  public config(): void {
    this.cors = cors({
      origin: [
        'http://localhost:8000',
        'http://localhost:8080',
        'http://localhost:4200',
      ],
      methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
      // allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true,
      preflightContinue: false,
    });
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(this.cors);

    this.app.use(express.static(__dirname + '/'));
  }

  // application routes
  public routes(): void {
    const router: express.Router = express.Router();

    // this.app.use('/api/v1/statistics', tokenValidiator, Routes.StatisticsRouter);
    this.app.use('/api/github', this.cors, GithubRouter);
    this.app.get('**', (req, res) => {
      res.sendFile(path.join(__dirname, '/index.html'));
    });
  }
}

export default new Server().app;
