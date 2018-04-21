import { Request, Response, Router } from 'express';
// import * as octokit from '@octokit/rest';
import * as Github from '../actions/github';
import * as request from 'request';
import { CONFIG } from '../config/github';

class GithubRouter {
    public router: Router;
    token: any;
    octokit: any;
    constructor() {
        this.router = Router();
        this.routes();
        // this.octokit = new octokit();
    }

    public authenticate(req: Request, res: Response): void {
        const api = `https://github.com/login/oauth/authorize?client_id=${CONFIG.client_id}`
        req.pipe(request(api)).pipe(res);
    }
    public postToken(req: Request, res: Response): void {
        const token = req.body.token;

        Github.postToken(token,
            response => {
                this.token = response.access_token;
                res.status(200).json(response);
            },
            err => res.status(err.statusCode).json(err.error)
        );
    }

    public getRepos(req: Request, res: Response): void {
        Github.getRepos( this.token,
            response => res.status(200).json(response),
            err => res.status(err.statusCode).json(err.error);
        );
    }

    // set up our routes
    public routes() {
        this.router.get('/auth', this.authenticate.bind(this));
        this.router.post('/token', this.postToken.bind(this));
        this.router.get('/repos', this.getRepos.bind(this));
    }
}

export default new GithubRouter().router;

// this.octokit.authenticate({
//     type: 'oauth',
//     token: this.token
// });
//     public getEventsForUser(req: Request, res: Response): void {
//     this.octokit.activity.getEventsForUser().then(result => res.json(result));
// }
