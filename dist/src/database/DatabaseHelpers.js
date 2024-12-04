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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferToBenficiary = exports.withdrawFromWallet = exports.fundUserWallet = exports.getUserData = exports.emailExist = exports.createAccountQuery = void 0;
var MysqlPool_1 = __importDefault(require("./../database/MysqlPool"));
var generateRandom = require('./../utils/FuncHelpers').generateRandom;
var onlyNumbersGreaterThanZero = require('./../utils/FuncHelpers').onlyNumbersGreaterThanZero;
var createAccountQuery = function (table, data) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, userCode, DbError_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, MysqlPool_1.default.getConnection()];
            case 1:
                connection = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 7, , 9]);
                return [4 /*yield*/, connection.beginTransaction()];
            case 3:
                _a.sent();
                userCode = generateRandom(10);
                // create user account ///
                return [4 /*yield*/, connection.query('INSERT INTO `user_accounts` (`full_name`, `email`, `phone`, `user_code`) VALUES(?, ?, ?, ?)', [data.full_name, data.email, data.phone, userCode])];
            case 4:
                // create user account ///
                _a.sent();
                /// create user wallet ////
                return [4 /*yield*/, connection.query('INSERT INTO `wallet_balance` (`user_code`) VALUES(?)', [userCode])];
            case 5:
                /// create user wallet ////
                _a.sent();
                return [4 /*yield*/, connection.commit()];
            case 6:
                _a.sent();
                return [3 /*break*/, 9];
            case 7:
                DbError_1 = _a.sent();
                return [4 /*yield*/, connection.rollback()];
            case 8:
                _a.sent();
                throw DbError_1;
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.createAccountQuery = createAccountQuery;
var emailExist = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var results, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, MysqlPool_1.default.query("SELECT * FROM user_accounts WHERE email = ? LIMIT 1", [email])];
            case 1:
                results = (_a.sent())[0];
                if (Object.values(results).length > 0) {
                    return [2 /*return*/, true];
                }
                else {
                    return [2 /*return*/, false];
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.emailExist = emailExist;
var getUserData = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var results, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, MysqlPool_1.default.query("SELECT * FROM user_accounts INNER JOIN wallet_balance ON user_accounts.user_code = wallet_balance.user_code WHERE user_accounts.email = ?", [email])];
            case 1:
                results = (_a.sent())[0];
                if (Object.values(results).length > 0) {
                    return [2 /*return*/, results[0]];
                }
                else {
                    return [2 /*return*/, []];
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                throw error_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserData = getUserData;
var fundUserWallet = function (email, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, results, userData, newAmount, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!onlyNumbersGreaterThanZero(amount)) {
                    return [2 /*return*/, { status: false, message: 'Character must be greater than 1. Numbers only' }];
                }
                return [4 /*yield*/, MysqlPool_1.default.getConnection()];
            case 1:
                connection = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 9, , 11]);
                return [4 /*yield*/, MysqlPool_1.default.query("SELECT * FROM user_accounts INNER JOIN wallet_balance ON user_accounts.user_code = wallet_balance.user_code WHERE user_accounts.email = ?", [email])];
            case 3:
                results = (_a.sent())[0];
                if (!(Object.values(results).length > 0)) return [3 /*break*/, 7];
                userData = results[0];
                newAmount = userData.balance + parseFloat(amount);
                return [4 /*yield*/, connection.beginTransaction()];
            case 4:
                _a.sent();
                /// Fund user wallet ////
                return [4 /*yield*/, connection.query('UPDATE `wallet_balance` SET `balance` = ? WHERE `user_code` = ?', [newAmount, userData.user_code])];
            case 5:
                /// Fund user wallet ////
                _a.sent();
                return [4 /*yield*/, connection.commit()];
            case 6:
                _a.sent();
                return [2 /*return*/, true];
            case 7: return [2 /*return*/, false];
            case 8: return [3 /*break*/, 11];
            case 9:
                error_3 = _a.sent();
                return [4 /*yield*/, connection.rollback()];
            case 10:
                _a.sent();
                throw error_3;
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.fundUserWallet = fundUserWallet;
var withdrawFromWallet = function (email, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, results, userData, newAmount, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!onlyNumbersGreaterThanZero(amount)) {
                    return [2 /*return*/, { status: false, message: 'Character must be greater than 1. Numbers only' }];
                }
                return [4 /*yield*/, MysqlPool_1.default.getConnection()];
            case 1:
                connection = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 9, , 11]);
                return [4 /*yield*/, connection.beginTransaction()];
            case 3:
                _a.sent();
                return [4 /*yield*/, connection.query("SELECT * FROM user_accounts INNER JOIN wallet_balance ON user_accounts.user_code = wallet_balance.user_code WHERE user_accounts.email = ?", [email])];
            case 4:
                results = (_a.sent())[0];
                if (!(Object.values(results).length > 0)) return [3 /*break*/, 7];
                userData = results[0];
                if (parseFloat(amount) > userData.balance) {
                    return [2 /*return*/, { status: false, message: 'insufficient balance' }];
                }
                newAmount = userData.balance - parseFloat(amount);
                /// update user wallet ////
                return [4 /*yield*/, connection.query('UPDATE `wallet_balance` SET `balance` = ? WHERE `user_code` = ?', [newAmount, userData.user_code])];
            case 5:
                /// update user wallet ////
                _a.sent();
                return [4 /*yield*/, connection.commit()];
            case 6:
                _a.sent();
                return [2 /*return*/, { status: true, message: 'success' }];
            case 7: return [2 /*return*/, { status: false, message: 'user not found' }];
            case 8: return [3 /*break*/, 11];
            case 9:
                error_4 = _a.sent();
                return [4 /*yield*/, connection.rollback()];
            case 10:
                _a.sent();
                throw error_4;
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.withdrawFromWallet = withdrawFromWallet;
var transferToBenficiary = function (sender_email, beneficiary_email, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, results, userData, newAmount, rows, userBeneficiaryData, newBeneficiaryWalletBalance, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!onlyNumbersGreaterThanZero(amount)) {
                    return [2 /*return*/, { status: false, message: 'Character must be greater than 1. Numbers only' }];
                }
                return [4 /*yield*/, MysqlPool_1.default.getConnection()];
            case 1:
                connection = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 9, , 11]);
                return [4 /*yield*/, connection.beginTransaction()];
            case 3:
                _a.sent();
                return [4 /*yield*/, connection.query("SELECT * FROM user_accounts INNER JOIN wallet_balance ON user_accounts.user_code = wallet_balance.user_code WHERE user_accounts.email = ?", [sender_email])];
            case 4:
                results = (_a.sent())[0];
                userData = results[0];
                if (parseFloat(amount) > userData.balance) {
                    return [2 /*return*/, { status: false, message: 'insufficient balance' }];
                }
                newAmount = userData.balance - parseFloat(amount);
                /// update sender wallet ////
                return [4 /*yield*/, connection.query('UPDATE `wallet_balance` SET `balance` = ? WHERE `user_code` = ?', [newAmount, userData.user_code])];
            case 5:
                /// update sender wallet ////
                _a.sent();
                return [4 /*yield*/, connection.query("SELECT * FROM user_accounts INNER JOIN wallet_balance ON user_accounts.user_code = wallet_balance.user_code WHERE user_accounts.email = ?", [beneficiary_email])];
            case 6:
                rows = (_a.sent())[0];
                userBeneficiaryData = rows[0];
                newBeneficiaryWalletBalance = userBeneficiaryData.balance + parseFloat(amount);
                /// update beneficiary wallet ////
                return [4 /*yield*/, connection.query('UPDATE `wallet_balance` SET `balance` = ? WHERE `user_code` = ?', [newBeneficiaryWalletBalance, userBeneficiaryData.user_code])];
            case 7:
                /// update beneficiary wallet ////
                _a.sent();
                return [4 /*yield*/, connection.commit()];
            case 8:
                _a.sent();
                return [2 /*return*/, { status: true, message: 'success' }];
            case 9:
                error_5 = _a.sent();
                return [4 /*yield*/, connection.rollback()];
            case 10:
                _a.sent();
                throw error_5;
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.transferToBenficiary = transferToBenficiary;
//# sourceMappingURL=DatabaseHelpers.js.map