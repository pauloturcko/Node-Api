import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";
import { PostLike } from "./post-like";
import { Comment } from "./comment";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "author_id", type: "int" })
  authorId: number;

  @Column({ type: "varchar" })
  content: string;

  @Column({ type: "varchar" })
  image?: string;

  @Column({ name: "likes", type: "int" })
  likes: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "author_id" })
  author: User;

  @OneToMany(() => PostLike, (postLike) => postLike.post)
  postLikes: PostLike[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
