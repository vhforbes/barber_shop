import "reflect-metadata";
import { DataSource } from "typeorm";
import { test1664240573713 } from "./migration/1664240573713-test";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "gobarber",
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [test1664240573713],
  subscribers: [],
});
