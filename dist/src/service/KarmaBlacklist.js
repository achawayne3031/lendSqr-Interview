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
exports.checkUserLoanCredibility = void 0;
const axios_1 = __importDefault(require("axios"));
const checkUserLoanCredibility = (identity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = 'sk_live_Hfvcf9srOs5pPWDporlAOWpDqrjon0y9PeUysTtB';
        const url = `https://adjutor.lendsqr.com/v2/verification/karma/${identity}`;
        const response = yield axios_1.default.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.data && response.data.status == 'success') {
            let karmaData = response.data.data;
            if (parseFloat(karmaData.amount_in_contention) > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
        console.log('Response data:', response.data);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            return false;
            console.error('Error message:', error.message);
        }
        else {
            return false;
            console.error('Unexpected error:', error);
        }
    }
});
exports.checkUserLoanCredibility = checkUserLoanCredibility;
//# sourceMappingURL=KarmaBlacklist.js.map