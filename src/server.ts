import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

(async () => {
  dotenv.config();
  const app: Application = express();

  const PORT: number = (process.env.PORT as unknown as number) || 5000;

  app.use("/", (req: Request, res: Response): void => {
    res.send("Hello world!");
  });

  app.listen(PORT, (): void => {
    console.log(`[⚡]: server running on: `, PORT);
  });
})();
