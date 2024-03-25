import { IUser } from '../../entities/interfaces/IUser.interface';
import CustomError from '../../middleware/Custom.error';
import { IPayload } from '../../entities/interfaces/IPayload.interface';
import { prismaClient } from '../database';
import { RegisterSchema } from '../../entities/Types/Register.type';

export default class UserService {
  public static async getAllUsers(): Promise<IUser[]> {
    return await prismaClient.users.findMany();
  }

  public static async getUserById(id: number): Promise<IUser> {
    const user = await prismaClient.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw CustomError.badRequest('User not found');

    return user;
  }

  public static async getUserByUsername(username: string): Promise<IUser> {
    const user = await prismaClient.users.findFirst({
      where: {
        username,
      },
    });

    return user;
  }

  public static async createUser(payload: IPayload): Promise<IUser> {
    const { username } = RegisterSchema.parse(payload);

    const findUser = await prismaClient.users.findFirst({
      where: {
        username,
      },
    });

    if (findUser) throw CustomError.badRequest('User already exists');

    return await prismaClient.users.create({
      data: {
        username,
      },
    });
  }

  public static async updateUser(id: number, payload: IPayload): Promise<IUser> {
    const { username } = RegisterSchema.parse(payload);

    const findUser = await prismaClient.users.findUnique({
      where: {
        id,
      },
    });

    if (!findUser) throw CustomError.badRequest('User not found');

    return await prismaClient.users.update({
      where: {
        id,
      },
      data: {
        username,
      },
    });
  }

  public static async deleteUser(id: number): Promise<IUser> {
    const user = await prismaClient.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw CustomError.badRequest('User not found');

    return await prismaClient.users.delete({
      where: {
        id,
      },
    });
  }
}
