import { Request, Response, Router } from 'express';

import * as Github from '../actions/github';
import * as request from 'request';
import { CONFIG } from '../config/github';

class OAuthRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public authenticate(req: Request, res: Response): void {
        const api = `https://github.com/login/oauth/authorize?client_id=${CONFIG.client_id}`;
        req.pipe(request(api)).pipe(res);
    }
    public postToken(req: Request, res: Response): void {
        const token = req.body.token;
        const payload = {
            client_id: CONFIG.client_id,
            client_secret: CONFIG.client_secret,
            code: token,
        }
        Github.postToken(payload,
            response => {
                res.status(200).json(response);
            },
            err => res.status(err.statusCode).json(err.error)
        );
    }
    // set up our routes
    public routes() {
        this.router.get('/auth', this.authenticate.bind(this));
        this.router.post('/token', this.postToken.bind(this));
    }
}

export default new OAuthRouter().router;
