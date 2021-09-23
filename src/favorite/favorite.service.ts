import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User, UserDocument } from '../user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly userService: UserService,
  ) {}
  async addPostToUserFavorite(post, user): Promise<User> {
    await this.userModel.findOneAndUpdate(
      { _id: user._id },
      {
        $push: {
          favorite: post._id,
        },
      },
      { new: true },
    );
    return this.userService.findByEmail(user.email);
  }
  async removePostFromFavorite(post, user): Promise<User> {
    await this.userModel.findOneAndUpdate(
      { _id: user._id },
      {
        $pull: {
          favorite: post._id,
        },
      },
    );
    return this.userService.findByEmail(user.email);
  }
}
