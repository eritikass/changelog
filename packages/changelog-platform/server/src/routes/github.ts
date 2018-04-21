import { Request, Response, Router } from 'express';
// import * as octokit from '@octokit/rest';
import * as Github from '../actions/github';

import { CONFIG } from '../config/github';

class GithubRouter {
    public router: Router;
    // token: any;
    octokit: any;
    constructor() {
        this.router = Router();
        this.routes();
        // this.octokit = new octokit();
    }

    public getRepos(req: Request, res: Response): void {
        const access_token = req.headers.authorization;
        Github.getRepos(access_token,
            response => res.status(200).json(response),
            err => res.status(err.statusCode).json(err.error)
        );
    }

    public onWebhook(req: Request, res: Response): void {
        console.log('webhookkkkkkkkkkkk');
        console.log(req.body);
    }
    public createWebhook(req: Request, res: Response): void {
        const access_token = req.headers.authorization;
        const owner = req.body.owner;
        const repo = req.body.repo;

        console.log(repo);
        
        const payload = {
            name: 'web',
            active: true,
            events: [
                'push',
                'pull_request'
            ],
            config: {
                url: 'http://localhost:8080/api/github/webhook',
                content_type: 'json'
            }
        };
        Github.createWebhook(owner, repo, payload, access_token,
            response => res.status(200).json(response),
            err => res.status(err.statusCode).json(err.error)
        );
    }

    // set up our routes
    public routes() {
        this.router.get('/repos', this.getRepos.bind(this));

        this.router.get('/webhook', this.onWebhook.bind(this));
        this.router.post('/webhook', this.createWebhook.bind(this));
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
