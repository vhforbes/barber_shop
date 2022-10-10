import { Router } from "express";
import AuthenticateUserService from "../services/AuthUserService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    // @ts-expect-error
    delete user.password;

    return res.json({ user, token });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
  }
});

export default sessionsRouter;
