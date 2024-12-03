const serverless = require("serverless-http");
const app = require("../../src/AccountRouter.js");
// test
module.exports.handler = serverless(app);
