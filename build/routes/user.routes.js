"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../database/controllers/user.controller"));
const user = (0, express_1.Router)();
const userController = new user_controller_1.default();
user.get('/', (req, res) => userController.getAllUsers(req, res));
user.get('/searchid/:id', (req, res) => userController.getUserById(req, res));
user.get('/searchname/:username', (req, res) => userController.getUserByUsername(req, res));
user.get('/add/:username', (req, res) => userController.createUser(req, res));
user.put('/update/:id', (req, res) => userController.updateUser(req, res));
user.delete('/delete/:id', (req, res) => userController.deleteUser(req, res));
exports.default = user;
//# sourceMappingURL=user.routes.js.map