import "express-async-errors";
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import errorMiddleware from "./middleware/Middleware.error";
import { prismaClient } from "./database/database";
import CustomError from "./middleware/Custom.error";

const port = process.env.PORT ?? 3001

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
  res.header('Access-Control-Allow-Headers', "*");
  next();
});

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World');
});

app.get('/user', async (_req: Request, res: Response) => {
  try {
    const users = await prismaClient.users.findMany();
    res.status(200).json(users);
  } catch (error) {
    throw CustomError.badRequest('Users not found');
  }
})

app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prismaClient.users.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) throw CustomError.badRequest('User not found');

    res.status(200).json(user);
  } catch (error) {
    throw CustomError.badRequest('User not found');
  }
})

app.get('/users/:username', async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    const user = await prismaClient.users.findFirst({
      where: {
        username,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    throw CustomError.badRequest('User not found');
  }
})

app.post('/users/add/:username', async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    if(!username) throw CustomError.badRequest('Username is required');

    const findUser = await prismaClient.users.findFirst({
      where: {
        username,
      },
    });

    if (findUser) throw CustomError.conflict('User already exists');

    const newUser = await prismaClient.users.create({
      data: {
        username: username,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    throw CustomError.badRequest('User not created');
  }
})

app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prismaClient.users.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    throw CustomError.badRequest('User not deleted');
  }
})

app.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if(!username) throw CustomError.badRequest('Username is required');

    const findUser = await prismaClient.users.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!findUser) throw CustomError.badRequest('User not found');

    const updatedUser = await prismaClient.users.update({
      where: {
        id: Number(id),
      },
      data: {
        username: username,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    throw CustomError.badRequest('User not updated');
  }
})

app.use(errorMiddleware);

app.listen(port, () => console.log('Server is running on port ', port))
