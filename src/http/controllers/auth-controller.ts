import { Request, Response } from "express";
import { UserRepository } from "../../db/repositories/user-repository.js";
import { authenticateValidator } from "../validators/authenticate-validator.js";
import { ZodError } from "zod";
import { verifyPassword } from "../../utils/hash-password.js";
import { generateToken } from "../../utils/jwt.js";

export class AuthController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async authenticate(req: Request, res: Response) {
    try {
      const { email, password } = authenticateValidator.parse(req.body);
      const user = await this.userRepository.loadByEmail(email);
      if (!user) {
        res.status(401).json({
          message: "Unauthorized",
        });
        return;
      }

      const isPasswordValid = await verifyPassword(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({
          message: "Unauthorized",
        });
        return;
      }
      console.log("Senha correta!");

      const token = generateToken(user.id);
      res.status(200).json({
        token,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: error,
        });
      } else {
        res.status(500).json({
          error,
        });
      }
    }
  }
}
