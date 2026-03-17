import { CommentsRepository } from "../../db/repositories/comments";
import { Request, Response } from "express";
import { PostsRepository } from "../../db/repositories/posts";
import { createCommentValidator } from "../validators/create-comment-validator";
import { ZodError } from "zod";

export class CommentsController {
  private commentsRepository: CommentsRepository;
  private postsRepository: PostsRepository;

  constructor() {
    this.commentsRepository = new CommentsRepository();
    this.postsRepository = new PostsRepository();
  }

  async createComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        message: "Post id is required",
      });
      return;
    }

    const post = await this.postsRepository.loadById(Number(id));
    if (!post) {
      res.status(404).json({
        message: "Post not found",
      });
      return;
    }

    const userId = Number(req.user?.id);

    try {
      const data = createCommentValidator.parse(req.body);

      const comment = await this.commentsRepository.create({
        content: data.content,
        postId: post.id,
        userId,
      });

      res.status(201).json({
        comment,
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
