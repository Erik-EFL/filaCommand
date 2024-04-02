"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSchema = void 0;
const zod_1 = require("zod");
exports.RegisterSchema = zod_1.z.object({
    username: zod_1.z.string({
        invalid_type_error: 'Username must be a string',
        required_error: 'Username is required',
    })
});
//# sourceMappingURL=Register.type.js.map