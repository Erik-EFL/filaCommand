import { Request, Response } from "express";
import CustomError from '../../middleware/Custom.error';
import userService from "../services/user.services";

export default class UserController {
  async getAllUsers(_req: Request, res: Response): Promise<void> {
    const users = await userService.getAllUsers();

    if (!users) {
      throw new CustomError(404, "Users not found");
    }

    res.status(200).json(users);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await userService.getUserById(Number(id));

    if (!user) {
      throw new CustomError(404, "User not found");
    }

    res.status(200).json(user);
  }

  async getUserByUsername(req: Request, res: Response): Promise<void> {
    const { username } = req.params;

    const user = await userService.getUserByUsername(username);

    if (!user) {
      throw new CustomError(404, "User not found");
    }

    res.status(200).json(user);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const { username } = req.params;

    const findedUser = await userService.getUserByUsername(username);

    if (findedUser) {
      throw new CustomError(409, "Username already exists");
    }

    const user = await userService.createUser({ username });

    if (!user) {
      throw new CustomError(400, "Error creating user");
    }

    res.status(201).json(user);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      throw new CustomError(400, "Invalid username");
    }

    const user = await userService.updateUser(Number(id), { username });

    if (!user) {
      throw new CustomError(400, "Error updating user");
    }

    res.status(200).json(user);
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await userService.deleteUser(Number(id));

    res.status(204).json({ message: "User deleted" });
  }
}
