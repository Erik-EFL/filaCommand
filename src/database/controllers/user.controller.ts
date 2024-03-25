import { Request, Response } from "express";
import userService from "../services/user.services";
import CustomError from '../../middleware/Custom.error';

export default class UserController {
  async getAllUsers(_req: Request, res: Response): Promise<void> {
    try{
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      throw CustomError.badRequest("Error getting users");
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(Number(id));

      res.status(200).json(user);
    } catch (error) {
      throw CustomError.badRequest("Id is required");
    }
  }

  async getUserByUsername(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.params;

      const user = await userService.getUserByUsername(username);

      if (!user) throw CustomError.notFound('User not found');

      res.status(200).json(user);
    } catch (error: any) {
      throw CustomError.notFound(`Username Not Found`);
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const { username } = req.params;

    if (!username) throw CustomError.badRequest('Username is required');

    const userVerify = await userService.getUserByUsername(username);

    if (userVerify) throw CustomError.badRequest('Username already exists');

    const user = await userService.createUser({ username });

    res.status(201).json(user);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { username } = req.body;

      if (!username) throw CustomError.badRequest('Username is required');

      const user = await userService.updateUser(Number(id), { username });

      res.status(200).json(user);
    } catch (error) {
      throw CustomError.badRequest("Id and username are required");
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      await userService.deleteUser(Number(id));

      res.status(204).json();
    } catch (error) {
      throw CustomError.badRequest("Id is required");
    }
  }
}
