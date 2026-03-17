import { Router } from "express";
import { CommentsController } from "../controllers/comments-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const commentsRouter = Router();
const commentsController = new CommentsController();

commentsRouter.post("/posts/:id/comments", authMiddleware, (req, res) =>
  commentsController.createComment(req, res),
);

export { commentsRouter };
