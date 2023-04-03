import { v4 as uuidv4 } from "uuid";

// defining the user class
export class Account {
  id: string;
  balance: number;
  user_id: string;
  account_number: string;

  constructor({ balance, account_number }: Account) {
    this.id = uuidv4();
    this.balance = balance;
    this.user_id = uuidv4();
    this.account_number = account_number;
  }
}
