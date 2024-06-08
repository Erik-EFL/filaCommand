import { IPayload } from '../../entities/interfaces/IPayload.interface';
import { IUser } from '../../entities/interfaces/IUser.interface';
import { RegisterSchema } from '../../entities/Types/Register.type';
import CustomError from '../../middleware/Custom.error';
import { prisma } from '../database';

export default class UserService {
  public static async getAllUsers(): Promise<IUser[]> {
    const users = await prisma.users.findMany();

    return users;
  }

  public static async getUserById(id: number): Promise<IUser> {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  public static async getUserByUsername(username: string): Promise<IUser> {
    const user = await prisma.users.findFirst({
      where: {
        username,
      },
    });

    return user;
  }

  public static async createUser(payload: IPayload): Promise<IUser> {
    const { username } = RegisterSchema.parse(payload);

    await prisma.users.findFirst({
      where: {
        username,
      },
    });

    return await prisma.users.create({
      data: {
        username,
      },
    });
  }

  public static async updateUser(id: number, payload: IPayload): Promise<IUser> {
    const { username } = RegisterSchema.parse(payload);

    await prisma.users.findUnique({
      where: {
        id,
      },
    });


    return await prisma.users.update({
      where: {
        id,
      },
      data: {
        username,
      },
    });
  }

  public static async deleteUser(id: number): Promise<IUser> {
    await prisma.users.findUnique({
      where: {
        id,
      },
    });

    return await prisma.users.delete({
      where: {
        id,
      },
    });
  }
}
