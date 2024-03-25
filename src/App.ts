import "express-async-errors";
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import errorMiddleware from "./middleware/Middleware.error";
import routes from "./routes/export.routes";


const port = process.env.PORT ?? 3001

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const accessControl: express.RequestHandler = (_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

app.use(accessControl);

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello World, welcome to queue app!", ok: true });
});

app.use("/users", routes.users);

app.use(errorMiddleware);

app.listen(port, () => console.log('Server is running on port ', port))
