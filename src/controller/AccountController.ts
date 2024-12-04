import { Request, Response } from 'express'
import { validateCreateAccountData, validateFundAccountData, validateAccountWithdrawalData, validateTransferData } from './../validation/AccountValidation'
import { ResponseData } from './../response/ResData'
import MysqlPool from './../database/MysqlPool';
import { checkUserLoanCredibility } from './../service/KarmaBlacklist'
import { createAccountQuery, emailExist, getUserData, fundUserWallet, withdrawFromWallet, transferToBenficiary } from './../database/DatabaseHelpers'
import { generateRandom }  from './../utils/FuncHelpers'


const AccountController = {
 
  createAccount: async (req: Request, res: Response) => {
      const { error } = validateCreateAccountData(req.body)
      if (error) {
        return res.json(ResponseData('failed', false, 'Validation error.', error.details[0].message, null, null))
      }
    
      try {

        const { email, phone } = req.body;

        // check Karma
        if(await checkUserLoanCredibility(email) || await checkUserLoanCredibility(phone)){
            return res.json(ResponseData('failed', false, 'You do not qualify to register on this platform, try and clear all your prevous debit', null,  null, null))    
        }

          /// check if email exists
        if(await emailExist(email)){
            return res.json(ResponseData('failed', false, 'Email address already in the system', null, null, null))    
        }

        // create account //
        await createAccountQuery('user_accounts', req.body);

        return res.json(ResponseData('success', true, 'Account created', null, null, null))    

    
      } catch (ReqError) {
        return res.json(ResponseData('failed', false, 'Internal Server Error', ReqError, null, null))    
      }
  },
  

  fundAccount: async (req: Request, res: Response) => {

    const { error } = validateFundAccountData(req.body)
    if (error) {
      return res.json(ResponseData('failed', false, 'Validation error.', error.details[0].message,  null, null))
    }
  
    try {

      const { email, amount } = req.body;

      /// check if email exists
      if(!await emailExist(email)){
          return res.json(ResponseData('failed', false, 'User not found in the system', null,  null, null))    
      }

      let fundStatus = await fundUserWallet(email, amount);

      if(!fundStatus){
        return res.json(ResponseData('failed', false, 'Account not funded', null,  null, null))    
      }

     return res.json(ResponseData('success', true, 'Account funded', null,  null, null))    

  
    } catch (ReqError) {
      return res.json(ResponseData('failed', false, 'Internal Server Error', ReqError,  null, null))    
    }

  },
 
  transfer: async (req: Request, res: Response) => {
    const { error } = validateTransferData(req.body)
    if (error) {
      return res.json(ResponseData('failed', false, 'Validation error.', error.details[0].message,  null, null))
    }
  
    try {
      const { sender_email, beneficiary_email, amount } = req.body;

       /// check if sender email exists
       if(!await emailExist(sender_email)){
        return res.json(ResponseData('failed', false, 'Sender user not found in the system', null,  null, null))    
    }

      /// check if beneficiary email exists
      if(!await emailExist(beneficiary_email)){
          return res.json(ResponseData('failed', false, 'Beneficiary user not found in the system', null,  null, null))    
      }

      let transferStatus = await transferToBenficiary(sender_email, beneficiary_email, amount);

      if(!transferStatus.status){
        return res.json(ResponseData('failed', false, transferStatus.message, null,  null, null))    
      }

     return res.json(ResponseData('success', true, 'Transfer was successful', null,  null, null))    

  
    } catch (ReqError) {
      return res.json(ResponseData('failed', false, 'Internal Server Error', ReqError,  null, null))    
    }


  },

  withdrawal: async (req: Request, res: Response) => {

    const { error } = validateAccountWithdrawalData(req.body)
    if (error) {
      return res.json(ResponseData('failed', false, 'Validation error.', error.details[0].message,  null, null))
    }
  
    try {
      const { email, amount } = req.body;

      /// check if email exists
      if(!await emailExist(email)){
          return res.json(ResponseData('failed', false, 'User not found in the system', null,  null, null))    
      }

      let withdrawStatus = await withdrawFromWallet(email, amount);

      if(!withdrawStatus.status){
        return res.json(ResponseData('failed', false, withdrawStatus.message, null,  null, null))    
      }

     return res.json(ResponseData('success', true, 'Withdrawal was successful', null,  null, null))    
  
    } catch (ReqError) {
      return res.json(ResponseData('failed', false, 'Internal Server Error', ReqError,  null, null))    
    }

  },
}

module.exports = AccountController


