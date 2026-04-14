import { Router } from "express";
import { FollowsController } from "../controllers/follows-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const followsRouter = Router();
const followsController = new FollowsController();

followsRouter.post("/follow/:followingId", authMiddleware, (req, res) =>
  followsController.createFollow(req, res),
);

export { followsRouter };
