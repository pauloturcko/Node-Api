import { Repository } from "typeorm";
import { Follow } from "../../models/follow";
import { appDataSource } from "../../config/data-source";

export class FollowsRepository {
  private repository: Repository<Follow>;

  constructor() {
    this.repository = appDataSource.getRepository(Follow);
  }

  async createFollow(followerId: number, followingId: number): Promise<Follow> {
    return await this.repository.save({
      followerId,
      followingId,
    });
  }

  async loadFollow(
    followerId: number,
    followingId: number,
  ): Promise<Follow | null> {
    return await this.repository.findOne({
      where: {
        followerId,
        followingId,
      },
    });
  }
}
