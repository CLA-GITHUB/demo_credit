import { v4 as uuidv4 } from "uuid";

// defining the user class
export class User {
  id?: string;
  name: string;
  email: string;
  password: string;

  constructor({ name, email, password }: User) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
