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
    public getUser(req: Request, res: Response): void {
        const access_token = req.headers.authorization;
        Github.getUser(access_token,
            response => {
                res.status(200).json(response);
            },
            err => res.status(err.statusCode).json(err.error)
        );
    }


    public getRepos(req: Request, res: Response): void {
        const access_token = req.headers.authorization;
        Github.getRepos(access_token,
            response => {
                res.status(200).json(response);
            },
            err => res.status(err.statusCode).json(err.error)
        );
    }

    public onWebhook(req: Request, res: Response): void {
        console.log('webhookkkkkkkkkkkk');
        console.log(req.body);
    }
    public getWebhooks(req: Request, res: Response): void {
        const access_token = req.headers.authorization;
        const owner = req.body.owner;
        const repo = req.body.repo; 

        Github.getWebhook(owner, repo, access_token,
            response => res.status(200).json(response),
            err => res.status(err.statusCode).json(err.error)
        );
    }
    public hasWebhooks(req: Request, res: Response): void {
        const access_token = req.headers.authorization;
        const owner = req.body.owner;
        const repo = req.body.repo;

        Github.getWebhook(owner, repo, access_token,
            response => {
                const events: string[] = response[0]['events'] || [];
                console.log(events);
                if (events.length > 0) {
                    console.log(events.length > 0);
                    res.status(200).json(true);
                } else {
                    res.status(200).json(false);
                }
            },
            err => res.status(err.statusCode).json(err.error)
        );
    }
    public createWebhook(req: Request, res: Response): void {
        const access_token = req.headers.authorization;
        const owner = req.body.owner;
        const repo = req.body.repo;

        const payload = {
            name: 'web',
            active: true,
            events: [
                'push',
                'pull_request'
            ],
            config: {
                url: CONFIG.oauth_url,
                content_type: 'json'
            }
        };
        Github.createWebhook(owner, repo, payload, access_token,
            response => res.status(200).json(response),
            err => res.status(err.statusCode).json(err.error)
        );
    }
    public pingWebhook(req: Request, res: Response): void {
        const access_token = req.headers.authorization;
        const owner = req.body.owner;
        const repo = req.body.repo;
        const id = req.body.id;

        Github.pingWebhook(owner, repo, id, access_token,
            response => res.status(200).json(response),
            err => res.status(err.statusCode).json(err.error)
        );
    }

    // set up our routes
    public routes() {
        this.router.get('/user', this.getUser.bind(this));
        this.router.get('/repos', this.getRepos.bind(this));

        this.router.get('/onwebhook', this.onWebhook.bind(this));
        this.router.post('/has_webhook', this.hasWebhooks.bind(this));
        this.router.post('/get_webhook', this.getWebhooks.bind(this));
        this.router.post('/post_webhook', this.createWebhook.bind(this));
        this.router.post('/ping_webhook', this.pingWebhook.bind(this));
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
