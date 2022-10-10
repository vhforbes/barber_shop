import path from "path";
import multer from "multer";
import crypto from "crypto";

const tempPath = path.resolve(__dirname, "..", "..", "temp");

export default {
  directory: tempPath,
  storage: multer.diskStorage({
    destination: tempPath,
    filename: (req, file, callback) => {
      // Gera um hash unico atraves da lib default do node (crypto) e transforma isso em uma string hexadecimal
      const fileHash = crypto.randomBytes(10).toString("hex");
      // Salva o nome do arquivo + o hash em uma variavel
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
