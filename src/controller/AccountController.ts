import { Request, Response } from 'express'
const { validateCreateAccountData, validateFundAccountData, validateAccountWithdrawalData, validateTransferData } = require('./../validation/AccountValidation')
const { ResponseData } = require('./../response/resData')
import MysqlPool from './../database/MysqlPool';
const { checkUserLoanCredibility } = require('./../service/KarmaBlacklist')

const { createAccountQuery, emailExist, getUserData, fundUserWallet, withdrawFromWallet, transferToBenficiary } = require('./../database/DatabaseHelpers')
const { generateRandom } = require('./../utils/FuncHelpers')


const AccountController = {
 
  createAccount: async (req: Request, res: Response) => {
      const { error } = validateCreateAccountData(req.body)
      if (error) {
        return res.json(ResponseData('failed', false, 'Validation error.', error.details[0].message))
      }
    
      try {

        const { email, phone } = req.body;

        // check Karma
        if(await checkUserLoanCredibility(email) || await checkUserLoanCredibility(phone)){
            return res.json(ResponseData('failed', false, 'You do not qualify to register on this platform, try and clear all your prevous debit', null))    
        }

          /// check if email exists
        if(await emailExist(email)){
            return res.json(ResponseData('failed', false, 'Email address already in the system', null))    
        }

        // create account //
        await createAccountQuery('user_accounts', req.body);

        return res.json(ResponseData('success', true, 'Account created', null))    

    
      } catch (ReqError) {
        return res.json(ResponseData('failed', false, 'Internal Server Error', ReqError))    
      }
  },
  

  fundAccount: async (req: Request, res: Response) => {

    const { error } = validateFundAccountData(req.body)
    if (error) {
      return res.json(ResponseData('failed', false, 'Validation error.', error.details[0].message))
    }
  
    try {

      const { email, amount } = req.body;

      /// check if email exists
      if(!await emailExist(email)){
          return res.json(ResponseData('failed', false, 'User not found in the system', null))    
      }

      let fundStatus = await fundUserWallet(email, amount);

      if(!fundStatus){
        return res.json(ResponseData('failed', false, 'Account not funded', null))    
      }

     return res.json(ResponseData('success', true, 'Account funded', null))    

  
    } catch (ReqError) {
      return res.json(ResponseData('failed', false, 'Internal Server Error', ReqError))    
    }

  },
 
  transfer: async (req: Request, res: Response) => {
    const { error } = validateTransferData(req.body)
    if (error) {
      return res.json(ResponseData('failed', false, 'Validation error.', error.details[0].message))
    }
  
    try {
      const { sender_email, beneficiary_email, amount } = req.body;

       /// check if sender email exists
       if(!await emailExist(sender_email)){
        return res.json(ResponseData('failed', false, 'Sender user not found in the system', null))    
    }

      /// check if beneficiary email exists
      if(!await emailExist(beneficiary_email)){
          return res.json(ResponseData('failed', false, 'Beneficiary user not found in the system', null))    
      }

      let transferStatus = await transferToBenficiary(sender_email, beneficiary_email, amount);

      if(!transferStatus.status){
        return res.json(ResponseData('failed', false, transferStatus.message, null))    
      }

     return res.json(ResponseData('success', true, 'Transfer was successful', null))    

  
    } catch (ReqError) {
      return res.json(ResponseData('failed', false, 'Internal Server Error', ReqError))    
    }


  },

  withdrawal: async (req: Request, res: Response) => {

    const { error } = validateAccountWithdrawalData(req.body)
    if (error) {
      return res.json(ResponseData('failed', false, 'Validation error.', error.details[0].message))
    }
  
    try {
      const { email, amount } = req.body;

      /// check if email exists
      if(!await emailExist(email)){
          return res.json(ResponseData('failed', false, 'User not found in the system', null))    
      }

      let withdrawStatus = await withdrawFromWallet(email, amount);

      if(!withdrawStatus.status){
        return res.json(ResponseData('failed', false, withdrawStatus.message, null))    
      }

     return res.json(ResponseData('success', true, 'Withdrawal was successful', null))    
  
    } catch (ReqError) {
      return res.json(ResponseData('failed', false, 'Internal Server Error', ReqError))    
    }

  },
}

module.exports = AccountController


