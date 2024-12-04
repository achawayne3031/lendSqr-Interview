"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyNumbersGreaterThanZero = exports.generateRandom = void 0;
var crypto_1 = __importDefault(require("crypto"));
var generateRandom = function (size) {
    if (size === void 0) { size = 20; }
    return crypto_1.default
        .randomBytes(size)
        .toString('base64')
        .slice(0, size);
};
exports.generateRandom = generateRandom;
var onlyNumbersGreaterThanZero = function (amount) {
    if (!isNaN(parseFloat(amount)) && parseFloat(amount) > 0) {
        return true;
    }
    return false;
};
exports.onlyNumbersGreaterThanZero = onlyNumbersGreaterThanZero;
//# sourceMappingURL=FuncHelpers.js.map