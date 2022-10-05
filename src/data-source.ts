import "reflect-metadata";
import { DataSource } from "typeorm";
import { AppointmentAndUser1664240573713 } from "./migration/1664240573713-AppointmentAndUser";
import Appointment from "./models/Appointment";
import User from "./models/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "gobarber",
  synchronize: true,
  logging: false,
  entities: [Appointment, User],
  migrations: [AppointmentAndUser1664240573713],
  subscribers: [],
});
