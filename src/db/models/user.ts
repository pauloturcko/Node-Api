import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./post";
import { PostLike } from "./post-like";
import { Comment } from "./comment";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, name: "email", type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar" })
  name: string;

  // Utilizamos a propriedade 'name' apenas para quando o nome da coluna do banco é diferente do atributo da classe
  @Column({ nullable: true, name: "profile_picture", type: "varchar" })
  profilePicture?: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => PostLike, (postLike) => postLike.post)
  likes: PostLike[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
