"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AccountController = require('./../controller/AccountController');
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/api/account/create', AccountController.createAccount);
app.post('/api/account/fund', AccountController.fundAccount);
app.post('/api/account/withdraw', AccountController.withdrawal);
app.post('/api/account/transfer', AccountController.transfer);
exports.default = app;
//# sourceMappingURL=AccountRouter.js.map