"use strict";
exports.__esModule = true;
var rp = require("request-promise");
exports.requestPromise = function (options, callback, errorHandler) { return rp(options).then(function (res) { return callback(res); })["catch"](function (err) { return errorHandler(err); }); };
