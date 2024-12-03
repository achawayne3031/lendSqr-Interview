import express from 'express';
const app = express();
app.use(express.json());
const AccountController = require('./../controller/AccountController')




app.post('/api/account/create', AccountController.createAccount)
app.post('/api/account/fund', AccountController.fundAccount)
app.post('/api/account/withdraw', AccountController.withdrawal)
app.post('/api/account/transfer', AccountController.transfer)






export default app;
