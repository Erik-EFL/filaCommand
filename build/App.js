"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Middleware_error_1 = __importDefault(require("./middleware/Middleware.error"));
const export_routes_1 = __importDefault(require("./routes/export.routes"));
const port = process.env.PORT ?? 3001;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const accessControl = (_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
    res.header('Access-Control-Allow-Headers', '*');
    next();
};
app.use(accessControl);
app.get("/", (_req, res) => {
    res.json({ message: "Hello World, welcome to queue app!", ok: true });
});
app.use("/users", export_routes_1.default.users);
app.use(Middleware_error_1.default);
app.listen(port, () => console.log('Server is running on port ', port));
//# sourceMappingURL=App.js.map