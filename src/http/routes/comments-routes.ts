import { Router } from "express";
import { CommentsController } from "../controllers/comments-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const commentsRouter = Router();
const commentsController = new CommentsController();

commentsRouter.post("/posts/:id/comments", authMiddleware, (req, res) =>
  commentsController.createComment(req, res),
);
commentsRouter.get("/posts/:id/comments", authMiddleware, (req, res) =>
  commentsController.loadPostComments(req, res),
);
commentsRouter.put("/posts/comments/:id", authMiddleware, (req, res) =>
  commentsController.updateComment(req, res),
);
commentsRouter.delete("/posts/comments/:id", authMiddleware, (req, res) =>
  commentsController.deleteComment(req, res),
);

export { commentsRouter };
