import RegisterController from "../database/Controller/Register.controller";
import { Router, Request, Response } from "express";


const register = Router();
const registerController = new RegisterController();

register.post("/:username", (req: Request, res: Response) => registerController.register(req, res));

export default register;
