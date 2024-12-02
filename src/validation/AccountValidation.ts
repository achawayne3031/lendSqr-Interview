const Joi = require('joi')


export const validateCreateAccountData = (data: any) => {
  const schema = Joi.object({
              full_name: Joi.string().required().messages({
                "any.required": "full name field is required",
                "string.empty": "full name should not be empty",
              }),    
              email: Joi.string().email().required().messages({
                "any.required": "email field is required",
                "string.empty": "email should not be empty",
                "string.email": "email field should be a valid email address",
              }),
           
              phone: Joi.string().required().messages({
                "any.required": "phone field is required",
                "string.empty": "phone should not be empty",
              }),  
          
          });

  return schema.validate(data)
}



export const validateFundAccountData = (data: any) => {
  const schema = Joi.object({
              email: Joi.string().email().required().messages({
                "any.required": "email field is required",
                "string.empty": "email should not be empty",
                "string.email": "email field should be a valid email address",
              }),
           
              amount: Joi.string().required().messages({
                "any.required": "amount field is required",
                "string.empty": "amount should not be empty",
              }),  
          
          });

  return schema.validate(data)
}




export const validateAccountWithdrawalData = (data: any) => {
  const schema = Joi.object({
              email: Joi.string().email().required().messages({
                "any.required": "email field is required",
                "string.empty": "email should not be empty",
                "string.email": "email field should be a valid email address",
              }),
           
              amount: Joi.string().required().messages({
                "any.required": "amount field is required",
                "string.empty": "amount should not be empty",
              }),  
          
          });

  return schema.validate(data)
}




export const validateTransferData = (data: any) => {
  const schema = Joi.object({
              sender_email: Joi.string().email().required().messages({
                "any.required": "sender email field is required",
                "string.empty": "sender email should not be empty",
                "string.email": "sender email field should be a valid email address",
              }),
              beneficiary_email: Joi.string().email().required().messages({
                "any.required": "beneficiary email field is required",
                "string.empty": "beneficiary email should not be empty",
                "string.email": "beneficiary email field should be a valid email address",
              }),
           
              amount: Joi.string().required().messages({
                "any.required": "amount field is required",
                "string.empty": "amount should not be empty",
              }),  
          
          });

  return schema.validate(data)
}










  






  
  
