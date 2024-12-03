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
const supertest_1 = __importDefault(require("supertest"));
const AccountRouter_1 = __importDefault(require("./../router/AccountRouter"));
describe('POST /api/account/transfer', () => {
    it('should transfer from account to another account', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(AccountRouter_1.default)
            .post('/api/account/transfer')
            .send({
            sender_email: "achawayne4@gmail.com",
            beneficiary_email: "achawayne2@gmail.com",
            amount: "10.50"
        });
        expect(response.status).toBe(200);
    }));
});
describe('POST /api/account/withdraw', () => {
    it('should withdraw from account', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(AccountRouter_1.default)
            .post('/api/account/withdraw')
            .send({
            email: "achawayne6@gmail.com",
            amount: "1.70"
        });
        expect(response.status).toBe(200);
    }));
});
describe('POST /api/account/fund', () => {
    it('should fund a user account', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(AccountRouter_1.default)
            .post('/api/account/fund')
            .send({
            email: "achawayne6@gmail.com",
            amount: "1.70"
        });
        expect(response.status).toBe(200);
    }));
});
describe('POST /api/account/create', () => {
    it('should create an account for users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(AccountRouter_1.default)
            .post('/api/account/create')
            .send({
            full_name: "achawayne sixtus",
            email: "achawayne6@gmail.com",
            phone: "08134873993"
        });
        expect(response.status).toBe(200);
    }));
});
//# sourceMappingURL=account.request.test.js.map