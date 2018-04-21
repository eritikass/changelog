const ENDPOINTS = {
    session: '/api/v1/session',
    user: '/api/v1/user',
    vehicle: '/api/v1/v',
    namespace: '/api/v1/namespace',
    statistics: '/api/v1/statistics',
    image: '/api/v1/image',
    message: '/api/v1/message'
};

export class Endpoint {
    private _api: string;
    private readonly _session = ENDPOINTS.session;
    private readonly _user = ENDPOINTS.user;
    private readonly _vehicle = ENDPOINTS.vehicle;
    private readonly _namespace = ENDPOINTS.namespace;
    private readonly _statistics = ENDPOINTS.statistics;
    private readonly _image = ENDPOINTS.image;
    private readonly _message = ENDPOINTS.message;

    constructor(api: string) {
        this._api = api;
    }

    get session(): string { return this._api + this._session; }
    get user(): string { return this._api + this._user; }
    get vehicle(): string { return this._api + this._vehicle; }
    get namespace(): string { return this._api + this._namespace; }
    get statistics(): string { return this._api + this._statistics; }
    get image(): string { return this._api + this._image; }
    get message(): string { return this._api + this._message; }
}
