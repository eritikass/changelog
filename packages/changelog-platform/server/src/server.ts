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

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors());

    this.app.use(express.static(__dirname + '/'));
  }

  // application routes
  public routes(): void {
    const router: express.Router = express.Router();

    // this.app.use('/api/v1/statistics', tokenValidiator, Routes.StatisticsRouter);
    this.app.use('/api/github', GithubRouter);
    this.app.get('**', (req, res) => {
      res.sendFile(path.join(__dirname, '/index.html'));
    });
  }
}

export default new Server().app;