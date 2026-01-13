import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/register", userController.register);

export { userRouter };
