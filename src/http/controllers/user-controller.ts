import type { Request, Response } from "express";
import { registerValidator } from "../validators/register-validator.js";
import { ZodError } from "zod";
import { hashPassword } from "../../utils/hash-password.js";
import { UserRepository } from "../../db/repositories/user-repository.js";

export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = registerValidator.parse(req.body);

      const emailInUse = await this.userRepository.loadByEmail(email);
      if (emailInUse) {
        res.status(409).json({
          mensagem: "Email already in use",
        });
        return;
      }

      const hashedPassword = await hashPassword(password);

      const createdUser = await this.userRepository.create({
        email: email,
        password: hashedPassword,
        name: name,
      });

      res.status(201).json({
        message: "User OK",
        createdUser,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          errors: error,
        });
      } else {
        res.status(500).json({ error });
      }
    }
  }
}
