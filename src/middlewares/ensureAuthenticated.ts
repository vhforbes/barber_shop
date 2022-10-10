import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "../config/auth";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Validar token JWT
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("JWT Token is missing");
  }

  // [Bearer, Token] => Only the , because Bearer (token type) will not be used
  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    //  -- as -- força o tipo da variavel
    const { sub } = decoded as TokenPayload;

    // Criar uma variavel dentro do req object, precisa alterar o type dele
    req.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new Error("Invalid JWT Token");
  }
};
