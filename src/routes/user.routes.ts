import { Router, Request, Response } from "express";
import UserController from "../database/controllers/user.controller";

const user = Router();
const userController = new UserController();

user.get('/', (req: Request, res: Response) => userController.getAllUsers(req, res))
user.get('/searchid/:id', (req: Request, res: Response) => userController.getUserById(req, res))
user.get('/searchname/:username', (req: Request, res: Response) => userController.getUserByUsername(req, res))
user.get('/add/:username', (req: Request, res: Response) => userController.createUser(req, res))
user.put('/update/:id', (req: Request, res: Response) => userController.updateUser(req, res))
user.delete('/delete/:id', (req: Request, res: Response) => userController.deleteUser(req, res))

export default user;
