import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";

@Entity("follows")
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "follower_id", type: "int" })
  followerId: number;

  @Column({ name: "following_id", type: "int" })
  followingId: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.following)
  @JoinColumn({ name: "follower_id" })
  follower: User;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: "following_id" })
  following: User;
}
