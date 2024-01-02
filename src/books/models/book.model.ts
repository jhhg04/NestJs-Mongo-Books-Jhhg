import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Book extends Document {
  @Prop({ unique: true, trim: true, required: true })
  title: string;

  @Prop({ trim: true })
  author: string;

  @Prop({ trim: true })
  genre: string;

  @Prop({ type: Number })
  publicationYear: number;

  @Prop({ default: false })
  isAvailable: boolean;
}

export const BookModel = SchemaFactory.createForClass(Book);
