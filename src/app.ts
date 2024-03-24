import "express-async-errors";
import express, { NextFunction, Request, Response } from 'express';
import route from "../src/routes/export.routes";
import cors from "cors";
import 'dotenv/config';
import errorMiddleware from "./middleware/Middleware.error";

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.use(cors());

    this.app.get('/', (req: Request, res: Response) => res.json({ ok: true }));

    this.app.use('/register', route.register);
    this.app.use('/user', route.users);

    this.app.use(errorMiddleware);
  }

  private config(): void {
    this.app.use(express.urlencoded({ extended: true }));

    const accessControl: express.RequestHandler = (_req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
