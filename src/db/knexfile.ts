import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.HOST || "containers-us-west-151.railway.app",
      user: process.env.USER || "root",
      password: process.env.PASSWORD || "a0LqnBsREfAErWg5ZEyW",
      database: process.env.DATABASE || "railway",
      port: (process.env.DB_PORT as unknown as number) || 7151,
      ssl: { rejectUnauthorized: false },
    },
    debug: true,
    useNullAsDefault: true,
  },

  // production: {
  //   client: "mysql",
  //   connection: {
  //     host: process.env.HOST,
  //     user: process.env.USER,
  //     password: process.env.PASSWORD,
  //     database: process.env.DATABASE,
  //     port: process.env.DB_PORT as unknown as number,
  //   },

  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },
};

export default config;
