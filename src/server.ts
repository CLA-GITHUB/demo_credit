import express, { Application } from "express";
import dotenv from "dotenv";
import cookies from "cookie-parser";
import { AuthController } from "./controller/AuthController";
import bodyParser from "body-parser";
import UserController from "./controller/UserController";
dotenv.config();

class App {
  private app: Application;

  constructor(private readonly port: number) {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares(): void {
    this.app.use(cookies());
    this.app.use(bodyParser.json());
  }

  private setupRoutes(): void {
    const authController = new AuthController();
    const userController = new UserController();

    this.app.use("/auth", authController.router);
    this.app.use("/user", userController.router);
  }

  public start(): void {
    this.app.listen(this.port, (): void => {
      console.log(`[⚡]: server running on: `, this.port);
    });
  }
}
const port = process.env.PORT;
const app = new App(port as unknown as number);
app.start();
// (async () => {
//
//   const app: Application = express();

//   const PORT: number = (process.env.PORT as unknown as number) || 5000;

//   app.use("/", (req: Request, res: Response): void => {
//     res.send("Hello world!");
//   });

//   app.listen(PORT, (): void => {
//     console.log(`[⚡]: server running on: `, PORT);
//   });
// })();
