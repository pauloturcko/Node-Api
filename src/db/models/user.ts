import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, name: "email" })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  // Utilizamos a propriedade 'name' apenas para quando o nome da coluna do banco é diferente do atributo da classe
  @Column({ nullable: true, name: "profile_picture" })
  profilePicture?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
