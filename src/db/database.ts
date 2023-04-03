import knex, { Knex } from "knex";
import config from "./knexfile";

export default class Database {
  protected connection: Knex;

  constructor() {
    this.connection = knex(config[process.env.NODE_ENV || "development"]);
  }

  async close() {
    await this.connection.destroy();
  }
}
