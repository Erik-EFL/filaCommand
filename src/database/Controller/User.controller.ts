import { Request, Response } from "express";
import CustomError from '../../middleware/Custom.error';
import UserService from "../../database/Services/User.services";

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

      /* if (!user) throw CustomError.badRequest('User not found'); */

      res.status(200).json(user);
    } catch (error) {
      throw CustomError.badRequest('User not found');
    }
  }

  getUserByUsername = async (req: Request, res: Response) => {
    try {
      const { username } = req.params;

      const user = await UserService.findUserByUsername(username);

      res.status(200).json(user);
    } catch (error) {
      throw CustomError.badRequest('User not found');
    }
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const { username } = req.params;

      if(!username) throw CustomError.badRequest('Username is required');

      const newUser = await UserService.createUser({ username });

      res.status(201).json(newUser);
    } catch (error) {
      throw CustomError.badRequest('User not created');
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await UserService.deleteUser(Number(id));

      res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
      throw CustomError.badRequest('User not deleted');
    }
  }

  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { username } = req.body;

      if(!username) throw CustomError.badRequest('Username is required');

      const updatedUser = await UserService.updateUser(Number(id), { username });

      res.status(200).json(updatedUser);
    } catch (error) {
      throw CustomError.badRequest('User not updated');
    }
  }
}
