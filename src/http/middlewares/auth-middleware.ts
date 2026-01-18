import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/jwt.js";
import { UserRepository } from "../../db/repositories/user-repository.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token!);

    const userRepository = new UserRepository();
    const user = await userRepository.loadById(decoded.userId);
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
