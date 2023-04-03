import { Response } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { UserRepository } from "../repositories/UserRepository";
import { RequestWithPayload, ResponseObj } from "../types/types";
import BaseController from "./BaseController";

export default class UserController extends BaseController {
  constructor() {
    super();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get("/me", AuthMiddleware.authenticate, this.getMe);
  }

  async getMe(
    req: RequestWithPayload,
    res: Response<ResponseObj>
  ): Promise<void> {
    //check for user
    const userRepository = new UserRepository();
    const foundUser = await userRepository.getUser(req.userId!);

    if (!foundUser) {
      res.statusCode = 404;
      res.json({
        message: "user not found",
      });
      return;
    }

    //remover password form foundUser
    foundUser.password = "";

    res.statusCode = 200;
    res.json({
      payload: {
        user: foundUser,
      },
    });
  }
}
