import { Request, Response } from "express";
import { FollowsRepository } from "../../db/repositories/follows";

export class FollowsController {
  private followsRepository: FollowsRepository;

  constructor() {
    this.followsRepository = new FollowsRepository();
  }

  async createFollow(req: Request, res: Response) {
    const followerId = req.user?.id;
    if (!followerId) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const followingId = req.params.followingId;
    if (!followingId) {
      res.status(400).json({
        message: "Following Id is required",
      });
      return;
    }

    const alreadyFollow = await this.followsRepository.loadFollow(
      followerId,
      Number(followingId),
    );

    if (alreadyFollow) {
      res.status(403).json({
        message: "You already follow this user",
      });
      return;
    }

    await this.followsRepository.createFollow(followerId, Number(followingId));

    res.status(201).json({
      message: "Follow was added",
    });
  }

  async deleteFollow(req: Request, res: Response) {
    const followerId = req.user?.id;
    if (!followerId) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const followingId = req.params.followingId;
    if (!followingId) {
      res.status(400).json({
        message: "Following Id is required",
      });
      return;
    }

    const alreadyFollow = await this.followsRepository.loadFollow(
      followerId,
      Number(followingId),
    );

    if (!alreadyFollow) {
      res.status(404).json({
        message: "You can unfollow only users that you follow",
      });
      return;
    }

    await this.followsRepository.deleteFollow(followerId, Number(followingId));

    res.status(200).json({
      message: "User was unfollowed",
    });
  }

  async getFollowers(req: Request, res: Response) {
    const userId = Number(req.params.id);

    const followers = await this.followsRepository.loadFollowers(userId);

    res.status(200).json(followers);
  }

  async getFollowing(req: Request, res: Response) {
    const userId = Number(req.params.id);

    const following = await this.followsRepository.loadFollowing(userId);

    res.status(200).json(following);
  }
}
