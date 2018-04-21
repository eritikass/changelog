"use strict";
exports.__esModule = true;
var express_1 = require("express");
var octokit = require("@octokit/rest");
var github_1 = require("../config/github");
var GithubRouter = /** @class */ (function () {
    function GithubRouter() {
        this.router = express_1.Router();
        this.routes();
        this.octokit = new octokit();
    }
    GithubRouter.prototype.authenticate = function (req, res) {
        console.log('called');
        var api = "https://github.com/login/oauth/authorize?client_id=" + github_1.CONFIG.client_id;
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
    };
    GithubRouter.prototype.getEventsForUser = function (req, res) {
        // this.octokit.activity.getEventsForUser({
        //     username: ''
        // }).then(result => res.json(result));
    };
    // set up our routes
    GithubRouter.prototype.routes = function () {
        this.router.get('/auth', this.authenticate.bind(this));
        this.router.post('/events', this.getEventsForUser.bind(this));
    };
    return GithubRouter;
}());
exports["default"] = new GithubRouter().router;
