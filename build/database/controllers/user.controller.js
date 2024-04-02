"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_services_1 = __importDefault(require("../services/user.services"));
const Custom_error_1 = __importDefault(require("../../middleware/Custom.error"));
class UserController {
    async getAllUsers(_req, res) {
        try {
            const users = await user_services_1.default.getAllUsers();
            res.status(200).json(users);
        }
        catch (error) {
            throw Custom_error_1.default.badRequest("Error getting users");
        }
    }
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await user_services_1.default.getUserById(Number(id));
            res.status(200).json(user);
        }
        catch (error) {
            throw Custom_error_1.default.badRequest("Id is required");
        }
    }
    async getUserByUsername(req, res) {
        try {
            const { username } = req.params;
            const user = await user_services_1.default.getUserByUsername(username);
            if (!user)
                throw Custom_error_1.default.notFound('User not found');
            res.status(200).json(user);
        }
        catch (error) {
            throw Custom_error_1.default.notFound(`Username Not Found`);
        }
    }
    async createUser(req, res) {
        const { username } = req.params;
        if (!username)
            throw Custom_error_1.default.badRequest('Username is required');
        const userVerify = await user_services_1.default.getUserByUsername(username);
        if (userVerify)
            throw Custom_error_1.default.badRequest('Username already exists');
        const user = await user_services_1.default.createUser({ username });
        res.status(201).json(user);
    }
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { username } = req.body;
            if (!username)
                throw Custom_error_1.default.badRequest('Username is required');
            const user = await user_services_1.default.updateUser(Number(id), { username });
            res.status(200).json(user);
        }
        catch (error) {
            throw Custom_error_1.default.badRequest("Id and username are required");
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await user_services_1.default.deleteUser(Number(id));
            res.status(204).json();
        }
        catch (error) {
            throw Custom_error_1.default.badRequest("Id is required");
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map