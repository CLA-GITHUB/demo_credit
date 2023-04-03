import { ResponseObj } from "./../types/types";
import { Request, Response } from "express";
import { User } from "../models/user";
import AuthValidator from "../validators/AuthValidator";
import BaseController from "./BaseController";
import { UserRepository } from "../repositories/UserRepository";
import { compareSync, hashSync } from "bcryptjs";
import Utilities from "../utils/Utilities";

export class AuthController extends BaseController {
  constructor() {
    super();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post("/signup", this.signup);
    this.router.post("/login", this.login);
    this.router.get("/logout", this.logout);
  }

  async signup(req: Request, res: Response<ResponseObj>): Promise<void> {
    // get fields in request body
    const { name, email, password }: Pick<User, "name" | "email" | "password"> =
      req.body;

    //validate fields and return errors if any
    const validationErrors = AuthValidator.validateSignupInputs({
      name,
      email,
      password,
    });
    if (validationErrors.length > 0) {
      res.statusCode = 400;
      res.json({
        message: "Validation error",
        success: false,
        errors: validationErrors,
      });
      return;
    }

    //checks if email is already registered
    const userRespository = new UserRepository();

    try {
      const foundUser = await userRespository.getUser(email);
      if (foundUser) {
        res.statusCode = 400;
        res.json({
          message: "user with this email already exists",
          success: false,
          errors: ["email exists"],
        });
        return;
      }
      //hash password and create user
      const user = new User({ name, email, password: hashSync(password, 10) });
      await userRespository.createUser(user);

      res.statusCode = 201;
      res.json({
        message: "user created",
        success: true,
      });
    } catch (error: any) {
      res.statusCode = 500;
      res.json({
        message: error.message,
        success: false,
      });
      return;
    }
  }

  async login(req: Request, res: Response<ResponseObj>): Promise<void> {
    const { email, password }: Pick<User, "email" | "password"> = req.body;

    //validate inputs
    const validationErrors = AuthValidator.validateLoginInputs({
      email,
      password,
    });
    if (validationErrors.length > 0) {
      res.statusCode = 400;
      res.json({
        success: false,
        message: "Validation error",
        errors: validationErrors,
      });
      return;
    }

    try {
      //check if user exists
      const userRepository = new UserRepository();
      const userExist = await userRepository.getUser(email);
      if (!userExist || !compareSync(password, userExist.password)) {
        res.status(401);
        res.json({
          message: "invalid email or password",
          success: false,
        });
        return;
      }

      //create token
      const token = Utilities.generateToken(
        { userId: userExist?.id },
        process.env.LOGIN_SECRET!
      );
      //set cookie
      Utilities.createTokenCookie(res, token);
      res.sendStatus(200);
      return;
    } catch (error: any) {
      console.error(error);
      res.statusCode = 500;
      res.json({
        message: error?.message,
        success: false,
      });
      return;
    }
  }

  async logout(_req: Request, res: Response<ResponseObj>): Promise<void> {
    Utilities.deleteTokenCookie(res);
    res.sendStatus(200);
  }
}
