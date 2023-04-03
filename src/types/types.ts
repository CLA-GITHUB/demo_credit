import { Request } from "express";
import { Account } from "../models/account";
import { Transaction } from "../models/transaction";
import { User } from "../models/user";

export type RequestWithPayload = Request & {
  userId?: string;
};

export type ResponseObj = {
  message?: string;
  success?: boolean;
  errors?: string[];
  payload?: {
    [key: string]: User | Account | Transaction[];
  };
};
