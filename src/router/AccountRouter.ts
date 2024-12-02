import * as express from 'express'
const router = express.Router()
const AccountController = require('./../controller/AccountController')



router.post('/create', AccountController.createAccount)
router.post('/fund', AccountController.fundAccount)
router.post('/withdraw', AccountController.withdrawal)
router.post('/transfer', AccountController.transfer)







module.exports = router
