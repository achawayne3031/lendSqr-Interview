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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferToBenficiary = exports.withdrawFromWallet = exports.fundUserWallet = exports.getUserData = exports.emailExist = exports.createAccountQuery = void 0;
const MysqlPool_1 = __importDefault(require("./../database/MysqlPool"));
const { generateRandom } = require('./../utils/FuncHelpers');
const { onlyNumbersGreaterThanZero } = require('./../utils/FuncHelpers');
const createAccountQuery = (table, data) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield MysqlPool_1.default.getConnection();
    try {
        yield connection.beginTransaction();
        let userCode = generateRandom(10);
        // create user account ///
        yield connection.query('INSERT INTO `user_accounts` (`full_name`, `email`, `phone`, `user_code`) VALUES(?, ?, ?, ?)', [data.full_name, data.email, data.phone, userCode]);
        /// create user wallet ////
        yield connection.query('INSERT INTO `wallet_balance` (`user_code`) VALUES(?)', [userCode]);
        yield connection.commit();
    }
    catch (DbError) {
        yield connection.rollback();
        throw DbError;
    }
});
exports.createAccountQuery = createAccountQuery;
const emailExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /// check if email exists
        const [results] = yield MysqlPool_1.default.query(`SELECT * FROM user_accounts WHERE email = ? LIMIT 1`, [email]);
        if (Object.values(results).length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.emailExist = emailExist;
const getUserData = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /// check if email exists
        const [results] = yield MysqlPool_1.default.query(`SELECT * FROM user_accounts INNER JOIN wallet_balance ON user_accounts.user_code = wallet_balance.user_code WHERE user_accounts.email = ?`, [email]);
        if (Object.values(results).length > 0) {
            return results[0];
        }
        else {
            return [];
        }
    }
    catch (error) {
        throw error;
    }
});
exports.getUserData = getUserData;
const fundUserWallet = (email, amount) => __awaiter(void 0, void 0, void 0, function* () {
    if (!onlyNumbersGreaterThanZero(amount)) {
        return { status: false, message: 'Character must be greater than 1. Numbers only' };
    }
    const connection = yield MysqlPool_1.default.getConnection();
    try {
        /// get User data
        const [results] = yield MysqlPool_1.default.query(`SELECT * FROM user_accounts INNER JOIN wallet_balance ON user_accounts.user_code = wallet_balance.user_code WHERE user_accounts.email = ?`, [email]);
        if (Object.values(results).length > 0) {
            let userData = results[0];
            let newAmount = userData.balance + parseFloat(amount);
            yield connection.beginTransaction();
            /// Fund user wallet ////
            yield connection.query('UPDATE `wallet_balance` SET `balance` = ? WHERE `user_code` = ?', [newAmount, userData.user_code]);
            yield connection.commit();
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        yield connection.rollback();
        throw error;
    }
});
exports.fundUserWallet = fundUserWallet;
const withdrawFromWallet = (email, amount) => __awaiter(void 0, void 0, void 0, function* () {
    if (!onlyNumbersGreaterThanZero(amount)) {
        return { status: false, message: 'Character must be greater than 1. Numbers only' };
    }
    const connection = yield MysqlPool_1.default.getConnection();
    try {
        yield connection.beginTransaction();
        /// get User data
        const [results] = yield connection.query(`SELECT * FROM user_accounts INNER JOIN wallet_balance ON user_accounts.user_code = wallet_balance.user_code WHERE user_accounts.email = ?`, [email]);
        if (Object.values(results).length > 0) {
            let userData = results[0];
            if (parseFloat(amount) > userData.balance) {
                return { status: false, message: 'insufficient balance' };
            }
            let newAmount = userData.balance - parseFloat(amount);
            /// update user wallet ////
            yield connection.query('UPDATE `wallet_balance` SET `balance` = ? WHERE `user_code` = ?', [newAmount, userData.user_code]);
            yield connection.commit();
            return { status: true, message: 'success' };
        }
        else {
            return { status: false, message: 'user not found' };
        }
    }
    catch (error) {
        yield connection.rollback();
        throw error;
    }
});
exports.withdrawFromWallet = withdrawFromWallet;
const transferToBenficiary = (sender_email, beneficiary_email, amount) => __awaiter(void 0, void 0, void 0, function* () {
    if (!onlyNumbersGreaterThanZero(amount)) {
        return { status: false, message: 'Character must be greater than 1. Numbers only' };
    }
    const connection = yield MysqlPool_1.default.getConnection();
    try {
        yield connection.beginTransaction();
        /// get sender data ///
        const [results] = yield connection.query(`SELECT * FROM user_accounts INNER JOIN wallet_balance ON user_accounts.user_code = wallet_balance.user_code WHERE user_accounts.email = ?`, [sender_email]);
        let userData = results[0];
        if (parseFloat(amount) > userData.balance) {
            return { status: false, message: 'insufficient balance' };
        }
        let newAmount = userData.balance - parseFloat(amount);
        /// update sender wallet ////
        yield connection.query('UPDATE `wallet_balance` SET `balance` = ? WHERE `user_code` = ?', [newAmount, userData.user_code]);
        // get beneficiary data ///
        const [rows] = yield connection.query(`SELECT * FROM user_accounts INNER JOIN wallet_balance ON user_accounts.user_code = wallet_balance.user_code WHERE user_accounts.email = ?`, [beneficiary_email]);
        let userBeneficiaryData = rows[0];
        let newBeneficiaryWalletBalance = userBeneficiaryData.balance + parseFloat(amount);
        /// update beneficiary wallet ////
        yield connection.query('UPDATE `wallet_balance` SET `balance` = ? WHERE `user_code` = ?', [newBeneficiaryWalletBalance, userBeneficiaryData.user_code]);
        yield connection.commit();
        return { status: true, message: 'success' };
    }
    catch (error) {
        yield connection.rollback();
        throw error;
    }
});
exports.transferToBenficiary = transferToBenficiary;
//# sourceMappingURL=DatabaseHelpers.js.map