"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseData = void 0;
const ResponseData = (status, success, message, data, token, debug) => {
    return { status: status, success: success, message: message, data: data, token: token, debug: debug };
};
exports.ResponseData = ResponseData;
//# sourceMappingURL=ResData.js.map