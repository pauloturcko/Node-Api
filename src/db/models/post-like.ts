import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./post";
import { User } from "./user";

@Entity("post_likes")
export class PostLike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "post_id", type: "int" })
  postId: number;

  @Column({ name: "user_id", type: "int" })
  userId: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Post, (post) => post.postLikes)
  @JoinColumn({ name: "post_id" })
  post: Post;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: "user_id" })
  user: User;
}
