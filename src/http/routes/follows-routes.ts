import { Router } from "express";
import { FollowsController } from "../controllers/follows-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const followsRouter = Router();
const followsController = new FollowsController();

followsRouter.post("/follow/:followingId", authMiddleware, (req, res) =>
  followsController.createFollow(req, res),
);

followsRouter.delete("/unfollow/:followingId", authMiddleware, (req, res) =>
  followsController.deleteFollow(req, res),
);

followsRouter.get("/users/:id/followers", authMiddleware, (req, res) =>
  followsController.getFollowers(req, res),
);

followsRouter.get("/users/:id/following", authMiddleware, (req, res) =>
  followsController.getFollowing(req, res),
);

export { followsRouter };
