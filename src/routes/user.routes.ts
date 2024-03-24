import { Router, Request, Response } from "express";
import UserController from "../database/Controller/User.controller";

const user = Router();
const userController = new UserController();

user.get("/:id", (req: Request, res: Response) => userController.getUserById(req, res));

user.get("/:username", (req: Request, res: Response) => userController.getUserByUsername(req, res));

user.get("/", (req: Request, res: Response) => userController.getAllUsers(req, res));

export default user;
