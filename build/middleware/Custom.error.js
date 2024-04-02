"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    status;
    details;
    constructor(status, message, details) {
        super(`Error: ${message} | Error Status Code: ${status}`);
        this.status = status;
        this.details = details || {};
    }
    static notFound(message, details) {
        return new CustomError(404, message, details);
    }
    static badRequest(message, details) {
        return new CustomError(400, message, details);
    }
    static conflict(message, details) {
        return new CustomError(409, message, details);
    }
    static serverError(message, details) {
        return new CustomError(500, message, details);
    }
}
exports.default = CustomError;
//# sourceMappingURL=Custom.error.js.map