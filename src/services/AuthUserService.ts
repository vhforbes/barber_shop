import { compare } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { sign } from "jsonwebtoken";

import authConfig from "../config/auth";
import User from "../models/User";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = AppDataSource.getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error("Incorrect auth data");
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error("Incorrect auth data");
    }

    // User authenticated
    // Generate a token

    // Arg 1 => Payload, dados que nao ficarao seguros no front
    // Arg 2 => Chave secreta
    // Arg 3 => Tokens configs

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
