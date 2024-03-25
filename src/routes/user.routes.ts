import { Router, Request, Response } from "express";
import UserController from "../database/Controller/User.controller";

const user = Router();
const userController = new UserController();

user.get("/", (req: Request, res: Response) => userController.getAllUsers(req, res));

user.get("/:id", (req: Request, res: Response) => userController.getUserById(req, res));

user.get("/:username", (req: Request, res: Response) => userController.getUserByUsername(req, res));

user.post("/:username", (req: Request, res: Response) => userController.createUser(req, res));

user.delete("/:id", (req: Request, res: Response) => userController.deleteUser(req, res));

user.put("/:id", (req: Request, res: Response) => userController.updateUser(req, res));


export default user;
