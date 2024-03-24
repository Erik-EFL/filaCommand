import { Request, Response } from "express";
import CustomError from '@/middleware/Custom.error';
import UserService from "@/database/Services/User.services";

export default class UserController {
  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await UserService.findAllUsers();
      res.status(200).json(users);
    } catch (error) {
      throw CustomError.badRequest('Users not found');
    }
  }

  getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await UserService.findUserById(Number(id));
      res.status(200).json(user);
    } catch (error) {
      throw CustomError.badRequest('User not found');
    }
  }

  getUserByUsername = async (req: Request, res: Response) => {
    try {
      const { username } = req.params;

      console.log(username);

      const user = await UserService.findUserByUsername(username);
      res.status(200).json(user);
    } catch (error) {
      throw CustomError.badRequest('User not found');
    }
  }
}
