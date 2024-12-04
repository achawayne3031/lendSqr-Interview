"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserLoanCredibility = void 0;
const axios_1 = __importDefault(require("axios"));
const checkUserLoanCredibility = async (identity) => {
    try {
        const token = 'sk_live_Hfvcf9srOs5pPWDporlAOWpDqrjon0y9PeUysTtB';
        const url = `https://adjutor.lendsqr.com/v2/verification/karma/${identity}`;
        const response = await axios_1.default.get(url, {
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
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            throw error;
        }
        else {
            throw error;
        }
    }
};
exports.checkUserLoanCredibility = checkUserLoanCredibility;
//# sourceMappingURL=KarmaBlacklist.js.map