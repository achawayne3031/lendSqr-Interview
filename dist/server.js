"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccountRouter_1 = __importDefault(require("./src/router/AccountRouter"));
const env = require('dotenv').config({ debug: process.env.DEBUG });
const port = process.env.PORT || 3000;
AccountRouter_1.default.get('/', (req, res) => {
    res.send('Hello World! Happy new day and July 13 2024');
});
AccountRouter_1.default.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map