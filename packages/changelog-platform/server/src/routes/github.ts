import { Request, Response, Router } from 'express';
import * as octokit from '@octokit/rest';
import * as Github from '../actions/github';
import * as request from 'request';
import { CONFIG } from '../config/github';

class GithubRouter {
    public router: Router;
    octokit: any
    constructor() {
        this.router = Router();
        this.routes();
        this.octokit = new octokit();
    }

    public authenticate(req: Request, res: Response): void {
        console.log('called');
        const api = `https://github.com/login/oauth/authorize?client_id=${CONFIG.client_id}`
        // req.pipe(request(api)).pipe(res);
        res.redirect(api);
        // Github.authenticate(
        //     response => res.status(200).json(response),
        //     err => res.status(err.statusCode).json(err.error)
        // )
        // this.octokit.authenticate({
        //     type: 'basic',
        //     username: '',
        //     password: ''
        // })
        // res.json('Authenticated!')
    }
    public getEventsForUser(req: Request, res: Response): void {
        // this.octokit.activity.getEventsForUser({
        //     username: ''
        // }).then(result => res.json(result));
    }

    // set up our routes
    public routes() {
        this.router.get('/auth', this.authenticate.bind(this));
        this.router.post('/events', this.getEventsForUser.bind(this));
    }
}

export default new GithubRouter().router;