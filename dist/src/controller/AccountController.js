"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { validateCreateAccountData, validateFundAccountData, validateAccountWithdrawalData, validateTransferData } = require('./../validation/AccountValidation');
const { ResponseData } = require('./../response/resData');
const { checkUserLoanCredibility } = require('./../service/KarmaBlacklist');
const { createAccountQuery, emailExist, getUserData, fundUserWallet, withdrawFromWallet, transferToBenficiary } = require('./../database/DatabaseHelpers');
const { generateRandom } = require('./../utils/FuncHelpers');
const AccountController = {
    createAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { error } = validateCreateAccountData(req.body);
        if (error) {
            return res.json(ResponseData('failed', false, 'Validation error.', error.details[0].message));
        }
        try {
            const { email, phone } = req.body;
            // check Karma
            if ((yield checkUserLoanCredibility(email)) || (yield checkUserLoanCredibility(phone))) {
                return res.json(ResponseData('failed', false, 'You do not qualify to register on this platform, try and clear all your prevous debit', null));
            }
            /// check if email exists
            if (yield emailExist(email)) {
                return res.json(ResponseData('failed', false, 'Email address already in the system', null));
            }
            // create account //
            yield createAccountQuery('user_accounts', req.body);
            return res.json(ResponseData('success', true, 'Account created', null));
        }
        catch (ReqError) {
            return res.json(ResponseData('failed', false, 'Internal Server Error', ReqError));
        }
    }),
    fundAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { error } = validateFundAccountData(req.body);
        if (error) {
            return res.json(ResponseData('failed', false, 'Validation error.', error.details[0].message));
        }
        try {
            const { email, amount } = req.body;
            /// check if email exists
            if (!(yield emailExist(email))) {
                return res.json(ResponseData('failed', false, 'User not found in the system', null));
            }
            let fundStatus = yield fundUserWallet(email, amount);
            if (!fundStatus) {
                return res.json(ResponseData('failed', false, 'Account not funded', null));
            }
            return res.json(ResponseData('success', true, 'Account funded', null));
        }
        catch (ReqError) {
            return res.json(ResponseData('failed', false, 'Internal Server Error', ReqError));
        }
    }),
    transfer: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { error } = validateTransferData(req.body);
        if (error) {
            return res.json(ResponseData('failed', false, 'Validation error.', error.details[0].message));
        }
        try {
            const { sender_email, beneficiary_email, amount } = req.body;
            /// check if sender email exists
            if (!(yield emailExist(sender_email))) {
                return res.json(ResponseData('failed', false, 'Sender user not found in the system', null));
            }
            /// check if beneficiary email exists
            if (!(yield emailExist(beneficiary_email))) {
                return res.json(ResponseData('failed', false, 'Beneficiary user not found in the system', null));
            }
            let transferStatus = yield transferToBenficiary(sender_email, beneficiary_email, amount);
            if (!transferStatus.status) {
                return res.json(ResponseData('failed', false, transferStatus.message, null));
            }
            return res.json(ResponseData('success', true, 'Transfer was successful', null));
        }
        catch (ReqError) {
            return res.json(ResponseData('failed', false, 'Internal Server Error', ReqError));
        }
    }),
    withdrawal: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { error } = validateAccountWithdrawalData(req.body);
        if (error) {
            return res.json(ResponseData('failed', false, 'Validation error.', error.details[0].message));
        }
        try {
            const { email, amount } = req.body;
            /// check if email exists
            if (!(yield emailExist(email))) {
                return res.json(ResponseData('failed', false, 'User not found in the system', null));
            }
            let withdrawStatus = yield withdrawFromWallet(email, amount);
            if (!withdrawStatus.status) {
                return res.json(ResponseData('failed', false, withdrawStatus.message, null));
            }
            return res.json(ResponseData('success', true, 'Withdrawal was successful', null));
        }
        catch (ReqError) {
            return res.json(ResponseData('failed', false, 'Internal Server Error', ReqError));
        }
    }),
};
module.exports = AccountController;
//# sourceMappingURL=AccountController.js.map