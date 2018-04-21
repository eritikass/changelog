"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");
var path = require("path");
var github_1 = require("./routes/github");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    // application config
    Server.prototype.config = function () {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(express.static(__dirname + '/'));
    };
    // application routes
    Server.prototype.routes = function () {
        var router = express.Router();
        // this.app.use('/api/v1/statistics', tokenValidiator, Routes.StatisticsRouter);
        this.app.use('/api/github', github_1["default"]);
        this.app.get('**', function (req, res) {
            res.sendFile(path.join(__dirname, '/index.html'));
        });
    };
    return Server;
}());
exports["default"] = new Server().app;
