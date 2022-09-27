import express from "express";
import "reflect-metadata";

import routes from "./routes";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

const app = express();

app.use(express.json());
app.use(routes);

// Testing user creation in DB using typeORM

// AppDataSource.initialize()
//   .then(async () => {
//     console.log("-----------------------------------------");
//     console.log("-----------------------------------------");
//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await AppDataSource.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await AppDataSource.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log(
//       "Here you can setup and run express / fastify / any other framework."
//     );
//   })
//   .catch((error) => console.log(error));

app.listen(3333, () => {
  console.log("Server started on port 3333");
});
