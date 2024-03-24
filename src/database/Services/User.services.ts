import { PrismaClient } from '@prisma/client';
import { IPayload } from '../../entities/interfaces/IPayload.interface';
import { IUser } from '../../entities/interfaces/IUser.interface';
import CustomError from '../../middleware/Custom.error';

const prisma = new PrismaClient()

export default class UserService {
  static findAllUsers = async () => {
    try {
      const users = await prisma.users.findMany();
      return users;
    } catch (error) {
      throw CustomError.badRequest('Users not found');
    }
  };

  static findUserById = async (id: number) => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: Number(id),
        },
      });

      return user;
    } catch (error) {
      throw CustomError.badRequest('User not found');
    }
  };

  static findUserByUsername = async (username: string) => {
    try {
      const user = await prisma.users.findFirst({
        where: {
          username,
        },
      });

      return user;
    } catch (error) {
      throw CustomError.badRequest('User not found');
    }
  };

  static createUser = async (data: IPayload) => {
    const { username } = data;

    if(!username) throw CustomError.badRequest('Username is required');

    const findUser = await this.findUserByUsername(username);

    if (findUser) throw CustomError.conflict('User already exists');

    const newUser = await prisma.users.create({
      data: {
        username: username,
      } as IUser,
    });

    return newUser;
  };
}
