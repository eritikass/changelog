const client_id = '623982830e4b37cdb4a7'

const ENDPOINTS = {
    auth: `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user%20repo%20repo_deployment%20admin:repo_hook%20admin:org_hook`,
    token: '/api/oauth/token',
    user: '/api/github/user',
    repos: '/api/github/repos',
    get_webhook: '/api/github/get_webhook',
    post_webhook: '/api/github/post_webhook',
    ping_webhook: '/api/github/ping_webhook'
};

export class Endpoint {
    private _api: string;
    private readonly _auth = ENDPOINTS.auth;
    private readonly _token = ENDPOINTS.token;
    private readonly _user = ENDPOINTS.user;
    private readonly _repos = ENDPOINTS.repos;
    private readonly _get_webhook = ENDPOINTS.get_webhook;
    private readonly _post_webhook = ENDPOINTS.post_webhook;
    private readonly _ping_webhook = ENDPOINTS.ping_webhook;

    constructor(api: string) {
        this._api = api;
    }

    get auth(): string { return this._api + this._auth; }
    get token(): string { return this._api + this._token; }
    get user(): string { return this._api + this._user; }
    get repos(): string { return this._api + this._repos; }
    get get_webhook(): string { return this._api + this._get_webhook; }
    get post_webhook(): string { return this._api + this._post_webhook; }
    get ping_webhook(): string { return this._api + this._ping_webhook; }
}

