import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/register", (req, res) => userController.register(req, res));
userRouter.get("/me", authMiddleware, (req, res) =>
  userController.getLoggedUser(req, res)
);

export { userRouter };
