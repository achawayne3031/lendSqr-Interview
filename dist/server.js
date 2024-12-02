"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env = require('dotenv').config({ debug: process.env.DEBUG });
const AccountRouter = require('./src/router/AccountRouter');
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Parse incoming JSON payloads
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
///// Account //////
app.use('/api/account', AccountRouter);
app.get('/', (req, res) => {
    res.send('Hello World! Happy new day and July 13 2024');
});
const server = app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
// Improved graceful shutdown
function gracefulShutdown() {
    server.close(() => {
        console.log('\nExpress server closed');
        // Ensure the queue stops before exiting the process
        process.exit(0);
    });
}
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
//# sourceMappingURL=server.js.map