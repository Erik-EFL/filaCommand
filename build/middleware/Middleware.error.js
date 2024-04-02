"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = async (err, _req, res, next) => {
    const { status, message } = err;
    res.status(status).send({ message: message || 'An error occurred' });
    next();
};
exports.default = errorMiddleware;
//# sourceMappingURL=Middleware.error.js.map