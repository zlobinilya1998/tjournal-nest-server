import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostDocument } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PostService {
  constructor(
    private eventEmitter: EventEmitter2,
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}
  async create(createPostDto: CreatePostDto, user: any): Promise<Post> {
    const createdPost = new this.postModel({
      ...createPostDto,
      user: user._id,
    });
    this.eventEmitter.emit('post.created');
    return createdPost.save();
  }
  async findAll(): Promise<Post[]> {
    const posts = this.postModel
      .find()
      .populate('user')
      .populate({ path: 'comments', populate: 'user' })
      .populate({
        path: 'reposts',
        populate: 'user',
      })
      .sort({ createdAt: -1 });

    return posts;
  }
  async findOne(id: string): Promise<Post> {
    return this.postModel
      .findOne({ _id: id })
      .populate('user')
      .populate({ path: 'comments', populate: 'user' })
      .populate({
        path: 'reposts',
        populate: 'user',
      });
  }
  async findPostsByUserId(id): Promise<Post[]> {
    return this.postModel
      .find({ user: id })
      .populate('user')
      .populate({ path: 'comments', populate: 'user' })
      .populate({
        path: 'reposts',
        populate: 'user',
      });
  }
  async incrementViews(id): Promise<Number> {
    const post = await this.postModel.findOneAndUpdate(
      { _id: id },
      {
        $inc: { views: 1 },
      },
      { new: true },
    );
    return post.views;
  }
}
