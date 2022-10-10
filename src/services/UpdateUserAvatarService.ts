import path from "path";
import fs from "fs";

import { AppDataSource } from "../data-source";

import uploadConfig from "../config/upload";
import User from "../models/User";

/**
 * [x] Recebe as infos da chamada
 * [x] Tratativa de erros/excessoes, logicas de negcio, ifs
 * [x] Acesso ao repositorio
 */

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = AppDataSource.getRepository(User);

    const user = await usersRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error("Invalid user to update avatar");
    }

    // Deleta avatar anterior caso exista
    if (user.avatar) {
      // Diretorio do avatar
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // Checa se o arquvio realmente existe
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // Remove o arquivo caso ele exista
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
