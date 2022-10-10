import { Router } from "express";

import multer from "multer";
import uploadConfig from "../config/upload";

import CreateUserService from "../services/CreateUserService";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

const usersRouter = Router();

// Cria uma instancia do multer com a nossa config
const upload = multer(uploadConfig);

usersRouter.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    // @ts-expect-error
    delete user.password;

    return res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
  }
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const updateUserAvatarService = new UpdateUserAvatarService();

      if (req.file) {
        const user = await updateUserAvatarService.execute({
          user_id: req.user.id,
          avatarFilename: req.file.filename,
        });

        return res.json({ user });
      }

      throw new Error("You must upload a file");
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
    }
  }
);

export default usersRouter;
