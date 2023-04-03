import Database from "../db/database";
import { User } from "../models/user";

export class UserRepository extends Database {
  constructor() {
    super();
  }

  async getUser(filter: string): Promise<User | null> {
    const users = await this.connection<User>("users")
      .where("id", filter)
      .orWhere("email", filter);

    await this.close();

    return users[0];
  }

  async createUser(user: User): Promise<void> {
    const newUser = new User(user);
    await this.connection<User>("users").insert(newUser);
    await this.close();
    return;
  }
}
