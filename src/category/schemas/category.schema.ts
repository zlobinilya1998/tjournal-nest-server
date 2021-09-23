import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ default: 'home.jpg' })
  avatar: string;

  @Prop({ required: true })
  name: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
