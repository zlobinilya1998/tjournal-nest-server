import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Comment } from '../../comment/schemas/comment.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  img: string;
  @Prop({ required: true })
  icon: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  html: string;
  @Prop({ required: true })
  category: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop({ default: 0 })
  views: number;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  reposts: User[];
}
export const PostSchema = SchemaFactory.createForClass(Post);
