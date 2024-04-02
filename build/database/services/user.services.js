"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Custom_error_1 = __importDefault(require("../../middleware/Custom.error"));
const database_1 = require("../database");
const Register_type_1 = require("../../entities/Types/Register.type");
class UserService {
    static async getAllUsers() {
        return await database_1.prismaClient.users.findMany();
    }
    static async getUserById(id) {
        const user = await database_1.prismaClient.users.findUnique({
            where: {
                id,
            },
        });
        if (!user)
            throw Custom_error_1.default.badRequest('User not found');
        return user;
    }
    static async getUserByUsername(username) {
        const user = await database_1.prismaClient.users.findFirst({
            where: {
                username,
            },
        });
        return user;
    }
    static async createUser(payload) {
        const { username } = Register_type_1.RegisterSchema.parse(payload);
        const findUser = await database_1.prismaClient.users.findFirst({
            where: {
                username,
            },
        });
        if (findUser)
            throw Custom_error_1.default.badRequest('User already exists');
        return await database_1.prismaClient.users.create({
            data: {
                username,
            },
        });
    }
    static async updateUser(id, payload) {
        const { username } = Register_type_1.RegisterSchema.parse(payload);
        const findUser = await database_1.prismaClient.users.findUnique({
            where: {
                id,
            },
        });
        if (!findUser)
            throw Custom_error_1.default.badRequest('User not found');
        return await database_1.prismaClient.users.update({
            where: {
                id,
            },
            data: {
                username,
            },
        });
    }
    static async deleteUser(id) {
        const user = await database_1.prismaClient.users.findUnique({
            where: {
                id,
            },
        });
        if (!user)
            throw Custom_error_1.default.badRequest('User not found');
        return await database_1.prismaClient.users.delete({
            where: {
                id,
            },
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.services.js.map