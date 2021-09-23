import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../post/schemas/post.schema';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly postService: PostService,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async findAllComments(): Promise<Comment[]> {
    return this.commentModel.find().populate('user').populate('post');
  }

  async create(createCommentDto: CreateCommentDto, user: any): Promise<Post> {
    const newComment = new this.commentModel({
      ...createCommentDto,
      user: user._id,
    });
    await newComment.save();
    await this.postModel.findOneAndUpdate(
      { _id: createCommentDto.post },
      {
        $push: {
          comments: newComment,
        },
      },
    );
    return this.postService.findOne(createCommentDto.post);
  }

  async findAllCommentsInPost(id) {
    return this.commentModel.find({ post: id });
  }
  async findAllCommentsOfUser(id): Promise<Comment[]> {
    return this.commentModel.find({ user: id }).populate('post');
  }
}
