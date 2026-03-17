import { Repository } from "typeorm";
import { Comment } from "../../models/comment";
import { appDataSource } from "../../config/data-source";
import { CreateCommentDTO } from "./dtos/create-comment-dto";

export class CommentsRepository {
  private repository: Repository<Comment>;

  constructor() {
    this.repository = appDataSource.getRepository(Comment);
  }

  async create(data: CreateCommentDTO): Promise<Comment> {
    return await this.repository.save(data);
  }
}
