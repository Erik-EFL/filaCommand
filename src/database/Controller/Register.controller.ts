import UserService from "../Services/User.services";
import { Request, Response } from "express";
import CustomError from "../../middleware/Custom.error";


export default class RegisterController {
  register = async (req: Request, res: Response) => {
    const { username } = req.params;

    if (!username) throw CustomError.badRequest('Username is required');

    await UserService.createUser({ username });

    res.status(201).json({ message: 'User created' });
  }
}
