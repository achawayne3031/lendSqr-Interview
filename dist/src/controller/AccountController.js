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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('./../validation/AccountValidation'), validateCreateAccountData = _a.validateCreateAccountData, validateFundAccountData = _a.validateFundAccountData, validateAccountWithdrawalData = _a.validateAccountWithdrawalData, validateTransferData = _a.validateTransferData;
var ResponseData = require('./../response/resData').ResponseData;
var checkUserLoanCredibility = require('./../service/KarmaBlacklist').checkUserLoanCredibility;
var _b = require('./../database/DatabaseHelpers'), createAccountQuery = _b.createAccountQuery, emailExist = _b.emailExist, getUserData = _b.getUserData, fundUserWallet = _b.fundUserWallet, withdrawFromWallet = _b.withdrawFromWallet, transferToBenficiary = _b.transferToBenficiary;
var generateRandom = require('./../utils/FuncHelpers').generateRandom;
var AccountController = {
    createAccount: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var error, _a, email, phone, _b, ReqError_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    error = validateCreateAccountData(req.body).error;
                    if (error) {
                        return [2 /*return*/, res.json(ResponseData('failed', false, 'Validation error.', error.details[0].message))];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 7, , 8]);
                    _a = req.body, email = _a.email, phone = _a.phone;
                    return [4 /*yield*/, checkUserLoanCredibility(email)];
                case 2:
                    _b = (_c.sent());
                    if (_b) return [3 /*break*/, 4];
                    return [4 /*yield*/, checkUserLoanCredibility(phone)];
                case 3:
                    _b = (_c.sent());
                    _c.label = 4;
                case 4:
                    // check Karma
                    if (_b) {
                        return [2 /*return*/, res.json(ResponseData('failed', false, 'You do not qualify to register on this platform, try and clear all your prevous debit', null))];
                    }
                    return [4 /*yield*/, emailExist(email)];
                case 5:
                    /// check if email exists
                    if (_c.sent()) {
                        return [2 /*return*/, res.json(ResponseData('failed', false, 'Email address already in the system', null))];
                    }
                    // create account //
                    return [4 /*yield*/, createAccountQuery('user_accounts', req.body)];
                case 6:
                    // create account //
                    _c.sent();
                    return [2 /*return*/, res.json(ResponseData('success', true, 'Account created', null))];
                case 7:
                    ReqError_1 = _c.sent();
                    return [2 /*return*/, res.json(ResponseData('failed', false, 'Internal Server Error', ReqError_1))];
                case 8: return [2 /*return*/];
            }
        });
    }); },
    fundAccount: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var error, _a, email, amount, fundStatus, ReqError_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    error = validateFundAccountData(req.body).error;
                    if (error) {
                        return [2 /*return*/, res.json(ResponseData('failed', false, 'Validation error.', error.details[0].message))];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    _a = req.body, email = _a.email, amount = _a.amount;
                    return [4 /*yield*/, emailExist(email)];
                case 2:
                    /// check if email exists
                    if (!(_b.sent())) {
                        return [2 /*return*/, res.json(ResponseData('failed', false, 'User not found in the system', null))];
                    }
                    return [4 /*yield*/, fundUserWallet(email, amount)];
                case 3:
                    fundStatus = _b.sent();
                    if (!fundStatus) {
                        return [2 /*return*/, res.json(ResponseData('failed', false, 'Account not funded', null))];
                    }
                    return [2 /*return*/, res.json(ResponseData('success', true, 'Account funded', null))];
                case 4:
                    ReqError_2 = _b.sent();
                    return [2 /*return*/, res.json(ResponseData('failed', false, 'Internal Server Error', ReqError_2))];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    transfer: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var error, _a, sender_email, beneficiary_email, amount, transferStatus, ReqError_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    error = validateTransferData(req.body).error;
                    if (error) {
                        return [2 /*return*/, res.json(ResponseData('failed', false, 'Validation error.', error.details[0].message))];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    _a = req.body, sender_email = _a.sender_email, beneficiary_email = _a.beneficiary_email, amount = _a.amount;
                    return [4 /*yield*/, emailExist(sender_email)];
                case 2:
                    /// check if sender email exists
                    if (!(_b.sent())) {
                        return [2 /*return*/, res.json(ResponseData('failed', false, 'Sender user not found in the system', null))];
                    }
                    return [4 /*yield*/, emailExist(beneficiary_email)];
                case 3:
                    /// check if beneficiary email exists
                    if (!(_b.sent())) {
                        return [2 /*return*/, res.json(ResponseData('failed', false, 'Beneficiary user not found in the system', null))];
                    }
                    return [4 /*yield*/, transferToBenficiary(sender_email, beneficiary_email, amount)];
                case 4:
                    transferStatus = _b.sent();
                    if (!transferStatus.status) {
                        return [2 /*return*/, res.json(ResponseData('failed', false, transferStatus.message, null))];
                    }
                    return [2 /*return*/, res.json(ResponseData('success', true, 'Transfer was successful', null))];
                case 5:
                    ReqError_3 = _b.sent();
                    return [2 /*return*/, res.json(ResponseData('failed', false, 'Internal Server Error', ReqError_3))];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    withdrawal: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var error, _a, email, amount, withdrawStatus, ReqError_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    error = validateAccountWithdrawalData(req.body).error;
                    if (error) {
                        return [2 /*return*/, res.json(ResponseData('failed', false, 'Validation error.', error.details[0].message))];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    _a = req.body, email = _a.email, amount = _a.amount;
                    return [4 /*yield*/, emailExist(email)];
                case 2:
                    /// check if email exists
                    if (!(_b.sent())) {
                        return [2 /*return*/, res.json(ResponseData('failed', false, 'User not found in the system', null))];
                    }
                    return [4 /*yield*/, withdrawFromWallet(email, amount)];
                case 3:
                    withdrawStatus = _b.sent();
                    if (!withdrawStatus.status) {
                        return [2 /*return*/, res.json(ResponseData('failed', false, withdrawStatus.message, null))];
                    }
                    return [2 /*return*/, res.json(ResponseData('success', true, 'Withdrawal was successful', null))];
                case 4:
                    ReqError_4 = _b.sent();
                    return [2 /*return*/, res.json(ResponseData('failed', false, 'Internal Server Error', ReqError_4))];
                case 5: return [2 /*return*/];
            }
        });
    }); },
};
module.exports = AccountController;
//# sourceMappingURL=AccountController.js.map