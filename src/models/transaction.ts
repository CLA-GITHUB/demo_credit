import { v4 as uuidv4 } from "uuid";

// defining the user class
export class Transaction {
  id: string;
  sender: string;
  receiver: string;
  is_withdraw: boolean;

  constructor({ is_withdraw = false }: Transaction) {
    this.id = uuidv4();
    this.sender = uuidv4();
    this.receiver = uuidv4();
    this.is_withdraw = is_withdraw;
  }
}
