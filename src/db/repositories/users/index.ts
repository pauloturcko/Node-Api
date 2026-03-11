import { Repository } from "typeorm";
import { User } from "../../models/user.js";
import { appDataSource } from "../../config/data-source.js";
import { CreateUserDTO } from "./dtos/create-users-dto.js";

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
  }

  async create(data: CreateUserDTO): Promise<User> {
    return await this.repository.save(data);
  }

  async loadByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({
      where: {
        email,
      },
    });
  }

  async loadById(id: number): Promise<User | null> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }
}
