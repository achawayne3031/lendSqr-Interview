"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AccountRouter_1 = __importDefault(require("./src/router/AccountRouter"));
var env = require('dotenv').config({ debug: process.env.DEBUG });
var port = process.env.PORT || 3000;
AccountRouter_1.default.get('/', function (req, res) {
    res.send('Hello World! Happy new day and July 13 2024');
});
AccountRouter_1.default.listen(port, function () {
    console.log("Server started at http://localhost:".concat(port));
});
//# sourceMappingURL=server.js.map